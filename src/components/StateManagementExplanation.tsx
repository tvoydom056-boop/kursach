import React from 'react';

const principles = [
  'Единый источник истины для состояния.',
  'Иммутабельные обновления через actions и reducers.',
  'Предсказуемое изменение данных при одинаковом наборе действий.',
  'Отделение бизнес-логики от компонентов интерфейса.',
];

const StateManagementExplanation: React.FC = () => {
  return (
    <div className="state-management-explanation page-layout">
      <div className="page-header">
        <h1 className="page-title">State Management: теория и практика</h1>
        <p className="page-subtitle">
          Раздел коротко объясняет, зачем нужен слой управления состоянием и
          почему он полезен даже в небольших приложениях.
        </p>
      </div>

      <section className="content-grid two-column-grid">
        <article className="card">
          <h2 className="subsection-title">Зачем это нужно</h2>
          <p className="body-text">
            Когда интерфейс становится сложнее, локального состояния компонентов
            уже недостаточно: данные начинают дублироваться, а логика обновлений
            расползается по приложению. Store помогает держать всё в одном месте.
          </p>
          <ul className="roadmap-list">
            {principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card code-card">
          <h2 className="subsection-title">Поток данных</h2>
          <pre>
            <code>{`UI event
  -> Action
  -> Store.dispatch(action)
  -> Reducer.reduce(state, action)
  -> New state
  -> Subscribers update UI`}</code>
          </pre>
        </article>
      </section>

      <section className="content-grid three-column-grid">
        <article className="card">
          <h3 className="subsection-title">Action</h3>
          <p className="body-text">
            Описывает, что произошло. Это событие, а не место для сложной логики.
          </p>
        </article>
        <article className="card">
          <h3 className="subsection-title">Reducer</h3>
          <p className="body-text">
            Получает текущее состояние и action, затем возвращает новую версию
            состояния без мутаций.
          </p>
        </article>
        <article className="card">
          <h3 className="subsection-title">Store</h3>
          <p className="body-text">
            Хранит state, принимает dispatch и уведомляет подписчиков о каждом
            обновлении.
          </p>
        </article>
      </section>
    </div>
  );
};

export default StateManagementExplanation;
