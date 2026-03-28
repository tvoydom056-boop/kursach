import React from 'react';
import { CounterActions, CounterSelectors } from '../state/AppStore';
import { useAppDispatch, useAppStore } from '../state/useAppStore';

const CounterDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { counter: counterState } = useAppStore();

  const history = CounterSelectors.getHistory(counterState);
  const currentValue = CounterSelectors.getValue(counterState);
  const step = CounterSelectors.getStep(counterState);
  const canUndo = CounterSelectors.canUndo(counterState);
  const previousValue = CounterSelectors.getPreviousValue(counterState);

  const min = Math.min(...history);
  const max = Math.max(...history);
  const average = history.reduce((sum, value) => sum + value, 0) / history.length;
  const steps = history.length - 1;

  return (
    <div className="counter-demo page-layout">
      <div className="page-header">
        <h1 className="page-title">Интерактивный счётчик</h1>
        <p className="page-subtitle">
          Этот экран теперь использует собственный store проекта: действия
          отправляются в reducer, а UI обновляется через подписку на состояние.
        </p>
      </div>

      <section className="counter-grid">
        <article className="card counter-panel counter-main-panel">
          <div className="counter-display">
            <div className="counter-value" aria-live="polite" aria-atomic="true">
              {currentValue}
            </div>
            <div className="counter-label">Текущее значение</div>
          </div>

          <div className="counter-controls">
            <div className="control-group">
              <span className="control-label">Шаг изменения</span>
              <div className="step-controls">
                <button
                  type="button"
                  className="step-button"
                  onClick={() => dispatch(CounterActions.setStep(step - 1))}
                  aria-label="Уменьшить шаг счётчика"
                >
                  -
                </button>
                <span className="step-value">{step}</span>
                <button
                  type="button"
                  className="step-button"
                  onClick={() => dispatch(CounterActions.setStep(step + 1))}
                  aria-label="Увеличить шаг счётчика"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                type="button"
                className="action-button decrement"
                onClick={() => dispatch(CounterActions.decrement())}
                aria-label="Уменьшить значение счётчика"
              >
                Уменьшить
              </button>
              <button
                type="button"
                className="action-button increment"
                onClick={() => dispatch(CounterActions.increment())}
                aria-label="Увеличить значение счётчика"
              >
                Увеличить
              </button>
            </div>

            <div className="management-buttons">
              <button
                type="button"
                className="management-button undo"
                onClick={() => dispatch(CounterActions.undo())}
                disabled={!canUndo}
                aria-label="Отменить последнее изменение счётчика"
              >
                Отменить
              </button>
              <button
                type="button"
                className="management-button reset"
                onClick={() => dispatch(CounterActions.reset())}
                aria-label="Сбросить счётчик"
              >
                Сбросить
              </button>
            </div>
          </div>
        </article>

        <aside className="card counter-panel">
          <h2 className="subsection-title">Метрики состояния</h2>
          <div className="info-grid compact-grid">
            <div className="info-item">
              <span className="info-label">Предыдущее</span>
              <span className="info-value">{previousValue ?? 'Нет'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Количество шагов</span>
              <span className="info-value">{steps}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Минимум</span>
              <span className="info-value">{min}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Максимум</span>
              <span className="info-value">{max}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Среднее</span>
              <span className="info-value">{average.toFixed(1)}</span>
            </div>
          </div>

          <div className="mini-flow">
            <div className="flow-pill">Action</div>
            <div className="flow-arrow">→</div>
            <div className="flow-pill">Reducer</div>
            <div className="flow-arrow">→</div>
            <div className="flow-pill">Store</div>
          </div>
        </aside>
      </section>

      <section className="card history-section">
        <div className="section-heading-row">
          <h2 className="subsection-title">История изменений</h2>
          <span className="muted-text">Хранится прямо в состоянии счётчика</span>
        </div>

        <div className="history-timeline">
          {history.map((value, index) => {
            const diff = index === 0 ? 0 : value - history[index - 1];
            const diffLabel = index === 0 ? 'Старт' : `${diff > 0 ? '+' : ''}${diff}`;

            return (
              <div key={`${value}-${index}`} className="history-item">
                <div className="history-step">Шаг {index}</div>
                <div className="history-value">{value}</div>
                <div className={`history-change ${diff > 0 ? 'positive' : diff < 0 ? 'negative' : ''}`}>
                  {diffLabel}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CounterDemo;
