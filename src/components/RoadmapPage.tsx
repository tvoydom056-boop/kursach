import React from 'react';
import type { Page } from '../App';

interface RoadmapPageProps {
  onNavigate: (page: Page) => void;
}

const roadmapColumns = [
  {
    title: 'Что уже хорошо',
    items: [
      'Есть собственная реализация Action / Reducer / Store.',
      'Проект объясняет архитектуру, а не только показывает интерфейс.',
      'Типизация и разделение по модулям уже создают хороший фундамент.',
    ],
  },
  {
    title: 'Что стоит улучшать дальше',
    items: [
      'Добавить автоматические тесты для reducers, selectors и store.',
      'Подключить сохранение состояния в localStorage.',
      'Сделать devtools-панель с журналом actions и time travel.',
    ],
  },
  {
    title: 'Идеи для новых фич',
    items: [
      'Авторизация и роли пользователей.',
      'Синхронизация задач с mock API.',
      'Тема интерфейса и настройка пользовательских предпочтений.',
    ],
  },
];

const RoadmapPage: React.FC<RoadmapPageProps> = ({ onNavigate }) => {
  return (
    <div className="roadmap-page">
      <div className="page-header">
        <h1 className="page-title">Анализ проекта и направления развития</h1>
        <p className="page-subtitle">
          Здесь собраны сильные стороны текущей версии, практичные улучшения и
          идеи, которые могут превратить курсовой проект в полноценное портфолио.
        </p>
      </div>

      <section className="section">
        <div className="roadmap-grid">
          {roadmapColumns.map((column) => (
            <article key={column.title} className="card roadmap-card">
              <h2 className="roadmap-title">{column.title}</h2>
              <ul className="roadmap-list">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="analysis-banner card">
          <div>
            <p className="analysis-label">Мой вывод по проекту</p>
            <h2 className="analysis-title">
              У тебя уже неплохая архитектурная заготовка, и теперь она выглядит
              заметно взрослее визуально.
            </h2>
            <p className="analysis-text">
              Следующий самый выгодный шаг по соотношению времени и результата:
              тесты + persistence + журнал действий.
            </p>
          </div>
          <div className="analysis-actions">
            <button
              type="button"
              className="cta-button primary"
              onClick={() => onNavigate('todo')}
              aria-label="Открыть страницу задач"
            >
              Открыть задачи
            </button>
            <button
              type="button"
              className="cta-button secondary"
              onClick={() => onNavigate('architecture')}
              aria-label="Открыть страницу архитектуры"
            >
              Посмотреть архитектуру
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;
