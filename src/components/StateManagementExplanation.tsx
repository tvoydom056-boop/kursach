import React from 'react';

const StateManagementExplanation: React.FC = () => {
  return (
    <div className="state-management-explanation">
      <div className="page-header">
        <h1 className="page-title">State Management System: Теория и практика</h1>
        <p className="page-subtitle">
          Подробное объяснение архитектуры системы управления состоянием на основе ООП
        </p>
      </div>

      <div className="content-container">
        <section className="section">
          <h2 className="section-title">🎯 Что такое State Management?</h2>
          <div className="section-content">
            <p>
              <strong>State Management</strong> (управление состоянием) — это архитектурный паттерн,
              который помогает организовать предсказуемое изменение состояния приложения.
              В клиентских приложениях состояние включает данные, интерфейс и бизнес-логику.
            </p>
            <div className="concept-card">
              <h3 className="concept-title">Ключевые принципы:</h3>
              <ul className="concept-list">
                <li><strong>Единый источник истины</strong> — состояние хранится в одном месте</li>
                <li><strong>Иммутабельность</strong> — состояние нельзя изменять напрямую</li>
                <li><strong>Однонаправленный поток данных</strong> — данные движутся в одном направлении</li>
                <li><strong>Предсказуемость</strong> — одинаковые действия производят одинаковые результаты</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">🏗️ Архитектурные компоненты</h2>
          <div className="components-grid">
            <div className="component-card">
              <div className="component-icon">🎬</div>
              <h3 className="component-title">Action (Действие)</h3>
              <p className="component-description">
                Объект, который описывает, что произошло. Содержит тип действия и дополнительные данные (payload).
              </p>
              <pre className="component-code">
{`class Action {
  constructor(
    public readonly type: string,
    public readonly payload?: any
  ) {}
}

// Примеры:
new Action('INCREMENT', 1)
new Action('ADD_TODO', {text: "Learn State Management"})`}
              </pre>
            </div>

            <div className="component-card">
              <div className="component-icon">🔄</div>
              <h3 className="component-title">Reducer (Редьюсер)</h3>
              <p className="component-description">
                Чистая функция, которая принимает текущее состояние и действие, возвращает новое состояние.
              </p>
              <pre className="component-code">
{`abstract class Reducer<T> {
  abstract reduce(state: T, action: Action): T;
}

// Пример реализации:
class CounterReducer extends Reducer<number> {
  reduce(state: number, action: Action): number {
    switch(action.type) {
      case 'INCREMENT': return state + 1;
      case 'DECREMENT': return state - 1;
      default: return state;
    }
  }
}`}
              </pre>
            </div>

            <div className="component-card">
              <div className="component-icon">🏪</div>
              <h3 className="component-title">Store (Хранилище)</h3>
              <p className="component-description">
                Централизованное хранилище состояния. Управляет редьюсерами и уведомляет подписчиков об изменениях.
              </p>
              <pre className="component-code">
{`class Store<T> {
  private state: T;
  private subscribers: Subscriber<T>[] = [];
  private reducer: Reducer<T>;

  dispatch(action: Action): void {
    this.state = this.reducer.reduce(this.state, action);
    this.notifySubscribers();
  }

  getState(): T { return this.state; }
  subscribe(subscriber: Subscriber<T>): void { ... }
}`}
              </pre>
            </div>

            <div className="component-card">
              <div className="component-icon">👁️</div>
              <h3 className="component-title">Subscriber (Подписчик)</h3>
              <p className="component-description">
                Компонент, который подписывается на изменения состояния и обновляется при изменениях.
              </p>
              <pre className="component-code">
{`interface Subscriber<T> {
  update(state: T): void;
}

// Пример реализации:
class CounterDisplay implements Subscriber<number> {
  update(state: number): void {
    console.log('New counter value:', state);
    // Обновить UI
  }
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">📊 Поток данных</h2>
          <div className="flow-diagram">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Пользовательское взаимодействие</h4>
                <p>Пользователь нажимает кнопку, вводит данные и т.д.</p>
              </div>
            </div>
            
            <div className="flow-arrow">→</div>

            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Создание Action</h4>
                <p>Создаётся объект Action с типом и данными</p>
              </div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Dispatch Action</h4>
                <p>Action отправляется в Store через метод dispatch()</p>
              </div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Обработка Reducer</h4>
                <p>Store передаёт Action и текущее состояние в Reducer</p>
              </div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-step">
              <div className="step-number">5</div>
              <div className="step-content">
                <h4>Обновление состояния</h4>
                <p>Reducer возвращает новое состояние, Store сохраняет его</p>
              </div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-step">
              <div className="step-number">6</div>
              <div className="step-content">
                <h4>Уведомление подписчиков</h4>
                <p>Store уведомляет всех подписчиков об изменении состояния</p>
              </div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-step">
              <div className="step-number">7</div>
              <div className="step-content">
                <h4>Обновление UI</h4>
                <p>Подписчики обновляют интерфейс на основе нового состояния</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">💡 Преимущества ООП-подхода</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <h3 className="advantage-title">Инкапсуляция</h3>
              <p>Каждый компонент (Action, Reducer, Store) имеет чётко определённую ответственность и скрывает внутреннюю реализацию.</p>
            </div>
            <div className="advantage-card">
              <h3 className="advantage-title">Наследование и полиморфизм</h3>
              <p>Можно создавать специализированные Reducer'ы, наследуясь от базового класса, и использовать их через единый интерфейс.</p>
            </div>
            <div className="advantage-card">
              <h3 className="advantage-title">Повторное использование</h3>
              <p>Компоненты State Management могут быть легко переиспользованы в разных частях приложения или даже в разных проектах.</p>
            </div>
            <div className="advantage-card">
              <h3 className="advantage-title">Тестируемость</h3>
              <p>Благодаря чёткому разделению ответственности и чистым функциям (Reducer'ам), система легко покрывается unit-тестами.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">🔧 Расширения и паттерны</h2>
          <div className="patterns-grid">
            <div className="pattern-card">
              <h3 className="pattern-title">Middleware</h3>
              <p>Промежуточное ПО для логирования, асинхронных действий, обработки ошибок.</p>
            </div>
            <div className="pattern-card">
              <h3 className="pattern-title">Time Travel</h3>
              <p>Сохранение истории состояний для отладки и "путешествия во времени".</p>
            </div>
            <div className="pattern-card">
              <h3 className="pattern-title">Selector</h3>
              <p>Функции для вычисления производных данных из состояния.</p>
            </div>
            <div className="pattern-card">
              <h3 className="pattern-title">Normalization</h3>
              <p>Нормализация вложенных структур данных для оптимизации обновлений.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StateManagementExplanation;