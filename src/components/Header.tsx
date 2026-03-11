import React from 'react';

type Page = 'home' | 'counter' | 'todo' | 'state-management' | 'architecture';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Главная', icon: '🏠' },
    { id: 'counter', label: 'Счётчик', icon: '🔢' },
    { id: 'todo', label: 'Задачи', icon: '✅' },
    { id: 'state-management', label: 'State Management', icon: '⚛️' },
    { id: 'architecture', label: 'Архитектура', icon: '🏗️' },
  ] as const;

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-icon">⚡</span>
            <h1 className="logo-text">State Management System</h1>
          </div>
          <p className="tagline">Курсовая работа по клиентскому программированию</p>
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
          <span className="status-text">State Management активен</span>
        </div>
      </div>
    </header>
  );
};

export default Header;