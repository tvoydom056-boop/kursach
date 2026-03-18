import React from 'react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Главная', icon: '01' },
    { id: 'counter', label: 'Счётчик', icon: '02' },
    { id: 'todo', label: 'Задачи', icon: '03' },
    { id: 'state-management', label: 'Теория', icon: '04' },
    { id: 'architecture', label: 'Архитектура', icon: '05' },
    { id: 'roadmap', label: 'Что дальше', icon: '06' },
  ] as const;

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-topline">
          <span className="eyebrow">State Management</span>
          <span className="header-badge">TypeScript + React + OOP Store</span>
        </div>

        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">SM</span>
            <div>
              <h1 className="logo-text">State Management Lab</h1>
              <p className="tagline">
                Платформа с интерактивными сценариями, собственной архитектурой store
                и единым подходом к работе с состоянием.
              </p>
            </div>
          </div>
        </div>

        <nav className="navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id as Page)}
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="status-indicator">
          <div className="status-dot"></div>
          <span className="status-text">Система активна и готова к работе</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
