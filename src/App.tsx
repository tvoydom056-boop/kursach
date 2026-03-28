import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CounterDemo from './components/CounterDemo';
import TodoDemo from './components/TodoDemo';
import StateManagementExplanation from './components/StateManagementExplanation';
import ArchitecturePage from './components/ArchitecturePage';
import ErrorBoundary from './components/ErrorBoundary';
import './style.css';

export type Page =
  | 'home'
  | 'counter'
  | 'todo'
  | 'state-management'
  | 'architecture';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'counter':
        return (
          <ErrorBoundary title="Ошибка на странице счётчика">
            <CounterDemo />
          </ErrorBoundary>
        );
      case 'todo':
        return (
          <ErrorBoundary title="Ошибка на странице списка задач">
            <TodoDemo />
          </ErrorBoundary>
        );
      case 'state-management':
        return <StateManagementExplanation />;
      case 'architecture':
        return <ArchitecturePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Перейти к основному содержимому
      </a>
      <div className="app-backdrop app-backdrop-left" aria-hidden="true" />
      <div className="app-backdrop app-backdrop-right" aria-hidden="true" />
      <div className="app-container">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main id="main-content" className="main-content" tabIndex={-1}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
