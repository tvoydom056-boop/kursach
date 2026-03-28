import React, { useState } from 'react';

interface PerformanceMeasurement {
  scenario: string;
  items: number;
  durationMs: number;
  opsPerSec: number;
}

interface PerformanceTestResults {
  dispatchResults: PerformanceMeasurement[];
  selectorResults: PerformanceMeasurement[];
}

const ArchitecturePage: React.FC = () => {
  const [results, setResults] = useState<PerformanceTestResults | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunPerformanceTest = async () => {
    if (!import.meta.env.DEV) {
      return;
    }

    setIsRunning(true);

    try {
      const { runPerformanceTest } = await import('../utils/perfTest');
      setResults(runPerformanceTest());
    } finally {
      setIsRunning(false);
    }
  };

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

      {import.meta.env.DEV ? (
        <section className="card performance-section" aria-labelledby="performance-title">
          <div className="section-heading-row">
            <div>
              <h2 id="performance-title" className="subsection-title">Измерение производительности</h2>
              <p className="body-text">
                Dev-only тесты для курсовой работы: замер dispatch и selector benchmark.
              </p>
            </div>
            <button
              type="button"
              className="cta-button primary"
              onClick={handleRunPerformanceTest}
              disabled={isRunning}
              aria-label="Запустить тест производительности store и selectors"
            >
              {isRunning ? 'Выполняется...' : 'Запустить тест производительности'}
            </button>
          </div>

          <p className="visually-hidden" aria-live="polite">
            {isRunning
              ? 'Выполняется тест производительности'
              : results
                ? 'Результаты теста производительности обновлены'
                : 'Результаты теста пока не сформированы'}
          </p>

          {results ? (
            <div className="performance-results">
              <div className="performance-group">
                <h3 className="subsection-title">Dispatch</h3>
                <table className="performance-table">
                  <caption className="visually-hidden">Результаты benchmark для dispatch</caption>
                  <thead>
                    <tr className="performance-row performance-head">
                      <th scope="col">Сценарий</th>
                      <th scope="col">Операций</th>
                      <th scope="col">Время, мс</th>
                      <th scope="col">Ops/sec</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.dispatchResults.map((result) => (
                      <tr key={result.scenario} className="performance-row">
                        <td>{result.scenario}</td>
                        <td>{result.items}</td>
                        <td>{result.durationMs.toFixed(3)}</td>
                        <td>{result.opsPerSec.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="performance-group">
                <h3 className="subsection-title">Selectors</h3>
                <table className="performance-table">
                  <caption className="visually-hidden">Результаты benchmark для selectors</caption>
                  <thead>
                    <tr className="performance-row performance-head">
                      <th scope="col">Сценарий</th>
                      <th scope="col">Элементов</th>
                      <th scope="col">Время, мс</th>
                      <th scope="col">Ops/sec</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.selectorResults.map((result) => (
                      <tr key={result.scenario} className="performance-row">
                        <td>{result.scenario}</td>
                        <td>{result.items}</td>
                        <td>{result.durationMs.toFixed(3)}</td>
                        <td>{result.opsPerSec.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
};

export default ArchitecturePage;
