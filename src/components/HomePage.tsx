import React from 'react';
import type { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const highlights = [
  {
    title: 'Собственный store',
    description:
      'Отдельный слой действий, редьюсеров и подписчиков делает поведение интерфейса предсказуемым и прозрачным.',
  },
  {
    title: 'Интерактивные сценарии',
    description:
      'Счётчик и менеджер задач показывают работу состояния в простом и в более сложном сценарии.',
  },
  {
    title: 'Масштабируемая структура',
    description:
      'Теория, архитектура и прикладные экраны собраны в одной системе и легко расширяются новыми модулями.',
  },
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">State management platform</span>
          <h1 className="hero-title">
            Единое пространство для управления состоянием, сценариями и структурой интерфейса.
          </h1>
          <p className="hero-subtitle">
            Приложение объединяет интерактивные экраны, собственный store,
            обработку действий и расширяемую архитектуру в одном цельном интерфейсе.
          </p>

          <div className="cta-buttons">
            <button
              type="button"
              className="cta-button primary"
              onClick={() => onNavigate('counter')}
              aria-label="Открыть страницу счётчика"
            >
              Открыть счётчик
            </button>
            <button
              type="button"
              className="cta-button secondary"
              onClick={() => onNavigate('architecture')}
              aria-label="Открыть страницу архитектуры"
            >
              Открыть архитектуру
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Разделов</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">TypeScript</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">OOP</div>
              <div className="stat-label">Архитектура</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">Store</div>
              <div className="stat-label">Подписки и history</div>
            </div>
          </div>
        </div>

        <div className="hero-panel card">
          <div className="panel-label">Ключевой фокус</div>
          <div className="panel-metric">Управление состоянием</div>
          <p className="panel-text">
            Интерфейс, состояние и логика обновлений работают как единая система
            с ясными правилами и предсказуемым поведением.
          </p>
          <div className="panel-list">
            <span className="chip">Actions</span>
            <span className="chip">Reducers</span>
            <span className="chip">Store</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Основные возможности</h2>
        <div className="features-grid">
          {highlights.map((item) => (
            <div key={item.title} className="feature-card">
              <div className="feature-icon">{item.title.slice(0, 2).toUpperCase()}</div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-preview-section">
        <h2 className="section-title">Разделы системы</h2>
        <div className="demo-cards">
          <div className="demo-card">
            <h3 className="demo-title">Счётчик</h3>
            <p className="demo-description">
              Состояние с шагом изменения, историей операций, undo и базовой аналитикой.
            </p>
            <div className="demo-preview">0 → 3 → 6 → 9</div>
          </div>
          <div className="demo-card">
            <h3 className="demo-title">Список задач</h3>
            <p className="demo-description">
              Коллекция объектов с приоритетами, фильтрацией, поиском и массовыми действиями.
            </p>
            <div className="demo-preview">high / medium / low</div>
          </div>
          <div className="demo-card">
            <h3 className="demo-title">Архитектура</h3>
            <p className="demo-description">
              Структура приложения, разделение слоёв и связь интерфейса с собственным store.
            </p>
            <div className="demo-preview">UI / state / integration</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">
          Архитектура и интерфейс работают вместе и остаются удобными для развития.
        </h2>
        <p className="cta-description">
          Каждый раздел продолжает общую модель состояния и поддерживает единый стиль взаимодействия.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
