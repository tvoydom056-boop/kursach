import React, { useState } from 'react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная', icon: '01' },
    { id: 'counter', label: 'Счётчик', icon: '02' },
    { id: 'todo', label: 'Задачи', icon: '03' },
    { id: 'state-management', label: 'Теория', icon: '04' },
    { id: 'architecture', label: 'Архитектура', icon: '05' },
  ] as const;

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-topline">
          <span className="eyebrow">State Management</span>
          <span className="header-badge">TypeScript + React + OOP Store</span>
        </div>

        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon" aria-hidden="true">SM</span>
            <div>
              <h1 className="logo-text">State Management Lab</h1>
              <p className="tagline">
                Платформа с интерактивными сценариями, собственной архитектурой store
                и единым подходом к работе с состоянием.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="burger-button"
          onClick={() => setIsMenuOpen((previousState) => !previousState)}
          aria-label={isMenuOpen ? 'Свернуть меню навигации' : 'Открыть меню навигации'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>

        <nav
          id="main-navigation"
          className={`navigation ${isMenuOpen ? 'navigation-open' : ''}`}
          aria-label="Основная навигация"
        >
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.id as Page)}
                  aria-label={`Перейти на страницу ${item.label}`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="status-indicator" aria-live="polite">
          <div className="status-dot" aria-hidden="true" />
          <span className="status-text">Система активна и готова к работе</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
