import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Курсовая работа: State Management System</h1>
          <p className="hero-subtitle">
            Демонстрация системы управления состоянием на основе объектно-ориентированного программирования
          </p>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Демо-примеров</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">TypeScript</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">ООП</div>
              <div className="stat-label">Архитектура</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">React</div>
              <div className="stat-label">Фронтенд</div>
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Ключевые особенности проекта</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚛️</div>
            <h3 className="feature-title">ООП-архитектура</h3>
            <p className="feature-description">
              Полностью объектно-ориентированная реализация системы управления состоянием с классами Action, Reducer и Store.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Инкапсуляция</h3>
            <p className="feature-description">
              Чёткое разделение ответственности между компонентами системы. Каждый класс выполняет свою уникальную роль.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Иммутабельность</h3>
            <p className="feature-description">
              Гарантированная неизменяемость состояния. Все изменения происходят через паттерн "действие-редьюсер".
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Отслеживаемость</h3>
            <p className="feature-description">
              Полная история изменений состояния с возможностью отладки и "путешествия во времени".
            </p>
          </div>
        </div>
      </div>

      <div className="demo-preview-section">
        <h2 className="section-title">Демонстрационные примеры</h2>
        <div className="demo-cards">
          <div className="demo-card">
            <h3 className="demo-title">Счётчик</h3>
            <p className="demo-description">
              Простейший пример использования State Management для управления числовым значением.
            </p>
            <div className="demo-preview">0 → 1 → 2 → ...</div>
          </div>
          <div className="demo-card">
            <h3 className="demo-title">Список задач</h3>
            <p className="demo-description">
              Управление коллекцией объектов с операциями добавления, удаления и изменения.
            </p>
            <div className="demo-preview">✅ Задача 1<br />✅ Задача 2<br />🔄 Задача 3</div>
          </div>
          <div className="demo-card">
            <h3 className="demo-title">Пользователи</h3>
            <p className="demo-description">
              Работа с сложными структурами данных и вложенными объектами.
            </p>
            <div className="demo-preview">👤 User 1<br />👤 User 2<br />👑 Admin</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Изучите систему управления состоянием</h2>
        <p className="cta-description">
          Навигация по разделам позволит вам изучить различные аспекты реализации,
          протестировать демо-примеры и понять архитектурные решения.
        </p>
        <div className="cta-buttons">
          <button className="cta-button primary">Начать изучение</button>
          <button className="cta-button secondary">Скачать исходный код</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;