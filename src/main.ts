import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

// Инициализация React приложения
const rootElement = document.getElementById('app');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  React.createElement(StrictMode, null,
    React.createElement(App, null)
  )
);

// Импортируем State Management систему
import { Action } from './state/Action';
import { Reducer, CounterReducer } from './state/Reducer';
import { Store } from './state/Store';

// Экспортируем классы для использования в демо
export { Action, Reducer, Store, CounterReducer };
