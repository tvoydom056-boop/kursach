import React, { useState } from 'react';
import { TodoActions, TodoSelectors } from '../state/AppStore';
import { useAppDispatch, useAppStore } from '../state/useAppStore';

const priorityLabels = {
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
} as const;

const TodoDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos: todoState } = useAppStore();
  const visibleTodos = TodoSelectors.getFilteredTodos(todoState);
  const stats = TodoSelectors.getStats(todoState);

  const [draft, setDraft] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const groupedStats = [
    { label: 'Всего', value: stats.total },
    { label: 'Активных', value: stats.active },
    { label: 'Выполнено', value: stats.completed },
    { label: 'Прогресс', value: `${Math.round(stats.progress)}%` },
  ];

  const addTodo = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    dispatch(TodoActions.addTodo(text, priority));
    setDraft('');
    setPriority('medium');
  };

  return (
    <div className="todo-demo page-layout">
      <div className="page-header">
        <h1 className="page-title">Менеджер задач</h1>
        <p className="page-subtitle">
          Более сложный пример состояния: список объектов, фильтры, поиск,
          сортировка и массовые операции поверх одного store.
        </p>
      </div>

      <section className="todo-layout">
        <article className="card todo-main-panel">
          <div className="todo-stats">
            {groupedStats.map((item) => (
              <div key={item.label} className="stat-card">
                <div className="stat-number">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="todo-input-section">
            <div className="input-group split-input-group">
              <input
                type="text"
                className="todo-input"
                placeholder="Например: добавить синхронизацию с API"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && addTodo()}
              />
              <select
                className="todo-select"
                value={priority}
                onChange={(event) => setPriority(event.target.value as 'high' | 'medium' | 'low')}
              >
                <option value="high">Высокий приоритет</option>
                <option value="medium">Средний приоритет</option>
                <option value="low">Низкий приоритет</option>
              </select>
              <button className="add-button" onClick={addTodo}>
                Добавить задачу
              </button>
            </div>
          </div>

          <div className="toolbar-grid">
            <div className="filter-buttons">
              <button
                className={`filter-button ${todoState.filter === 'all' ? 'active' : ''}`}
                onClick={() => dispatch(TodoActions.setFilter('all'))}
              >
                Все
              </button>
              <button
                className={`filter-button ${todoState.filter === 'active' ? 'active' : ''}`}
                onClick={() => dispatch(TodoActions.setFilter('active'))}
              >
                Активные
              </button>
              <button
                className={`filter-button ${todoState.filter === 'completed' ? 'active' : ''}`}
                onClick={() => dispatch(TodoActions.setFilter('completed'))}
              >
                Выполненные
              </button>
            </div>

            <input
              className="todo-search"
              type="text"
              value={todoState.searchQuery}
              placeholder="Поиск по задачам"
              onChange={(event) => dispatch(TodoActions.setSearchQuery(event.target.value))}
            />

            <div className="sort-controls">
              <select
                className="todo-select"
                value={todoState.sortBy}
                onChange={(event) =>
                  dispatch(
                    TodoActions.setSort(
                      event.target.value as 'createdAt' | 'priority' | 'text',
                      todoState.sortOrder,
                    ),
                  )
                }
              >
                <option value="createdAt">Сортировка по дате</option>
                <option value="priority">Сортировка по приоритету</option>
                <option value="text">Сортировка по названию</option>
              </select>
              <button
                className="filter-button"
                onClick={() =>
                  dispatch(
                    TodoActions.setSort(
                      todoState.sortBy,
                      todoState.sortOrder === 'asc' ? 'desc' : 'asc',
                    ),
                  )
                }
              >
                {todoState.sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
              </button>
            </div>
          </div>

          <div className="todo-list">
            {visibleTodos.length === 0 ? (
              <div className="empty-state">
                <h3 className="empty-title">Ничего не найдено</h3>
                <p className="empty-description">
                  Попробуй сменить фильтр или добавить новую задачу.
                </p>
              </div>
            ) : (
              <ul className="todo-items">
                {visibleTodos.map((todo) => (
                  <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <label className="todo-checkbox-row">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(TodoActions.toggleTodo(todo.id))}
                      />
                      <span className="todo-checkmark" />
                    </label>

                    <div className="todo-content">
                      <div className="todo-row">
                        <div className="todo-text">{todo.text}</div>
                        <span className={`priority-badge priority-${todo.priority}`}>
                          {priorityLabels[todo.priority]}
                        </span>
                      </div>
                      <div className="todo-meta">
                        <span>{todo.createdAt.toLocaleDateString('ru-RU')}</span>
                        <span>{todo.completed ? 'Выполнено' : 'В работе'}</span>
                      </div>
                    </div>

                    <div className="todo-actions">
                      <select
                        className="priority-select"
                        value={todo.priority}
                        onChange={(event) =>
                          dispatch(
                            TodoActions.setPriority(
                              todo.id,
                              event.target.value as 'high' | 'medium' | 'low',
                            ),
                          )
                        }
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                      <button
                        className="todo-delete"
                        onClick={() => dispatch(TodoActions.deleteTodo(todo.id))}
                        title="Удалить задачу"
                      >
                        Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>

        <aside className="card todo-side-panel">
          <h2 className="subsection-title">Быстрые действия</h2>
          <div className="side-actions">
            <button className="filter-button active" onClick={() => dispatch(TodoActions.toggleAll())}>
              Переключить все
            </button>
            <button className="filter-button" onClick={() => dispatch(TodoActions.clearCompleted())}>
              Очистить выполненные
            </button>
          </div>

          <div className="state-note">
            <h3 className="subsection-title">Что показывает это демо</h3>
            <ul className="roadmap-list">
              <li>Работу с коллекцией объектов в reducer.</li>
              <li>Производные данные через selectors.</li>
              <li>Сортировку и фильтрацию без прямого изменения UI-состояния.</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TodoDemo;
