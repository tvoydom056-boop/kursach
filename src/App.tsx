import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CounterDemo from './components/CounterDemo';
import TodoDemo from './components/TodoDemo';
import StateManagementExplanation from './components/StateManagementExplanation';
import ArchitecturePage from './components/ArchitecturePage';
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
        return <CounterDemo />;
      case 'todo':
        return <TodoDemo />;
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
      <div className="app-backdrop app-backdrop-left" />
      <div className="app-backdrop app-backdrop-right" />
      <div className="app-container">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="main-content">{renderPage()}</main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
