import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Курсовая работа</h3>
          <p className="footer-description">
            Демонстрация системы управления состоянием на основе ООП-принципов
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Технологии</h3>
          <ul className="tech-list">
            <li>TypeScript</li>
            <li>React</li>
            <li>Vite</li>
            <li>ООП Architecture</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Автор</h3>
          <p className="author-info">
            Студент группы ПИ-123<br />
            Иванов Иван Иванович
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Руководитель</h3>
          <p className="supervisor-info">
            Проф. Петров П.П.<br />
            Кафедра программной инженерии
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          © {currentYear} Клиентская система State Management. Все права защищены.
        </div>
        <div className="footer-links">
          <a href="#documentation" className="footer-link">Документация</a>
          <a href="#source" className="footer-link">Исходный код</a>
          <a href="#report" className="footer-link">Отчёт</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;