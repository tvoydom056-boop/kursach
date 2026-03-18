import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">О системе</h3>
          <p className="footer-description">
            Интерфейс для работы с состоянием, пользовательскими сценариями и
            модульной архитектурой на базе собственного store.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Технологии</h3>
          <ul className="tech-list">
            <li>TypeScript</li>
            <li>React</li>
            <li>Vite</li>
            <li>Custom Store Architecture</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Возможности</h3>
          <p className="author-info">
            Разделение ответственности
            <br />
            Иммутабельные обновления
            <br />
            Масштабируемая структура интерфейса
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Развитие</h3>
          <p className="supervisor-info">
            Middleware и devtools
            <br />
            Persist в localStorage
            <br />
            Тесты reducers и selectors
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} State Management Lab. Platform for interactive state workflows.
        </div>
        <div className="footer-links">
          <span className="footer-link">UI</span>
          <span className="footer-link">Store</span>
          <span className="footer-link">Roadmap</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
