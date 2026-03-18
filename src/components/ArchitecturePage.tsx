import React from 'react';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="architecture-page page-layout">
      <div className="page-header">
        <h1 className="page-title">Архитектура проекта</h1>
        <p className="page-subtitle">
          Основная идея проекта: UI и state management существуют отдельно, но
          связаны понятным контрактом через действия и подписки.
        </p>
      </div>

      <section className="content-grid two-column-grid">
        <article className="card code-card">
          <h2 className="subsection-title">Структура</h2>
          <pre>
            <code>{`src/
  components/
  state/
    Action.ts
    Reducer.ts
    Store.ts
    CounterState.ts
    TodoState.ts
    AppStore.ts`}</code>
          </pre>
        </article>

        <article className="card">
          <h2 className="subsection-title">Сильные стороны</h2>
          <ul className="roadmap-list">
            <li>Состояние отделено от визуального слоя.</li>
            <li>Логику легко переносить и тестировать отдельно.</li>
            <li>Проект легко масштабировать новыми state-модулями.</li>
          </ul>
        </article>
      </section>

      <section className="content-grid three-column-grid">
        <article className="card">
          <h3 className="subsection-title">UI Layer</h3>
          <p className="body-text">React-компоненты отображают данные и вызывают dispatch.</p>
        </article>
        <article className="card">
          <h3 className="subsection-title">State Layer</h3>
          <p className="body-text">Reducers определяют правила изменения данных.</p>
        </article>
        <article className="card">
          <h3 className="subsection-title">Integration Layer</h3>
          <p className="body-text">Хуки подписывают React на store и синхронизируют UI.</p>
        </article>
      </section>
    </div>
  );
};

export default ArchitecturePage;
