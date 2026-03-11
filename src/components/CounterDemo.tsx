import React, { useState } from 'react';

const CounterDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<number[]>([0]);

  const increment = () => {
    const newValue = counter + step;
    setCounter(newValue);
    setHistory([...history, newValue]);
  };

  const decrement = () => {
    const newValue = counter - step;
    setCounter(newValue);
    setHistory([...history, newValue]);
  };

  const reset = () => {
    setCounter(0);
    setStep(1);
    setHistory([0]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousValue = newHistory[newHistory.length - 1];
      setCounter(previousValue);
      setHistory(newHistory);
    }
  };

  return (
    <div className="counter-demo">
      <div className="demo-header">
        <h1 className="demo-title">Демонстрация: Счётчик</h1>
        <p className="demo-subtitle">
          Простейший пример использования State Management для управления числовым значением
        </p>
      </div>

      <div className="counter-container">
        <div className="counter-display">
          <div className="counter-value">{counter}</div>
          <div className="counter-label">Текущее значение</div>
        </div>

        <div className="counter-controls">
          <div className="control-group">
            <label className="control-label">Шаг изменения:</label>
            <div className="step-controls">
              <button 
                className="step-button"
                onClick={() => setStep(Math.max(1, step - 1))}
              >
                -
              </button>
              <span className="step-value">{step}</span>
              <button 
                className="step-button"
                onClick={() => setStep(step + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-button decrement" onClick={decrement}>
              Уменьшить ({step})
            </button>
            <button className="action-button increment" onClick={increment}>
              Увеличить (+{step})
            </button>
          </div>

          <div className="management-buttons">
            <button className="management-button undo" onClick={undo}>
              ↶ Отменить
            </button>
            <button className="management-button reset" onClick={reset}>
              ⟳ Сбросить
            </button>
          </div>
        </div>

        <div className="state-info">
          <h3 className="info-title">Информация о состоянии:</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Текущее значение:</div>
              <div className="info-value">{counter}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Шаг изменения:</div>
              <div className="info-value">{step}</div>
            </div>
            <div className="info-item">
              <div className="info-label">История изменений:</div>
              <div className="info-value">{history.length} шагов</div>
            </div>
            <div className="info-item">
              <div className="info-label">Последнее изменение:</div>
              <div className="info-value">
                {history.length > 1 ? history[history.length - 2] + ' → ' + history[history.length - 1] : 'Нет'}
              </div>
            </div>
          </div>
        </div>

        <div className="history-section">
          <h3 className="history-title">История изменений:</h3>
          <div className="history-timeline">
            {history.map((value, index) => (
              <div key={index} className="history-item">
                <div className="history-step">Шаг {index}</div>
                <div className="history-value">{value}</div>
                <div className="history-change">
                  {index > 0 ? `+${value - history[index - 1]}` : 'Начало'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="explanation-section">
          <h3 className="explanation-title">Как это работает:</h3>
          <div className="explanation-content">
            <p>
              <strong>State Management</strong> в этом примере реализует простейшую систему управления состоянием:
            </p>
            <ul>
              <li>Каждое изменение (increment/decrement) — это <strong>Action</strong></li>
              <li>Функции increment/decrement — это <strong>Reducers</strong>, которые создают новое состояние</li>
              <li>Массив <code>history</code> — это история состояний (State History)</li>
              <li>Кнопка "Отменить" реализует паттерн "путешествия во времени" (Time Travel)</li>
            </ul>
            <p className="code-example">
              <code>dispatch(new IncrementAction(step)) → reducer(state, action) → newState</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterDemo;