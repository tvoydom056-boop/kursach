import React, { useId, useState } from 'react';
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

  const newTodoInputId = useId();
  const newTodoPriorityId = useId();
  const searchInputId = useId();
  const sortSelectId = useId();

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
          <div className="todo-stats" aria-label="Статистика по задачам">
            {groupedStats.map((item) => (
              <div key={item.label} className="stat-card">
                <div className="stat-number">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="todo-input-section">
            <div className="input-group split-input-group">
              <label className="visually-hidden" htmlFor={newTodoInputId}>
                Текст новой задачи
              </label>
              <input
                id={newTodoInputId}
                type="text"
                className="todo-input"
                placeholder="Например: добавить синхронизацию с API"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && addTodo()}
                aria-label="Введите текст новой задачи"
              />
              <label className="visually-hidden" htmlFor={newTodoPriorityId}>
                Приоритет новой задачи
              </label>
              <select
                id={newTodoPriorityId}
                className="todo-select"
                value={priority}
                onChange={(event) => setPriority(event.target.value as 'high' | 'medium' | 'low')}
                aria-label="Выберите приоритет новой задачи"
              >
                <option value="high">Высокий приоритет</option>
                <option value="medium">Средний приоритет</option>
                <option value="low">Низкий приоритет</option>
              </select>
              <button
                type="button"
                className="add-button"
                onClick={addTodo}
                aria-label="Добавить новую задачу"
              >
                Добавить задачу
              </button>
            </div>
          </div>

          <div className="toolbar-grid">
            <div className="filter-buttons" role="group" aria-label="Фильтрация задач">
              <button
                type="button"
                className={`filter-button ${todoState.filter === 'all' ? 'active' : ''}`}
                onClick={() => dispatch(TodoActions.setFilter('all'))}
                aria-label="Показать все задачи"
                aria-pressed={todoState.filter === 'all'}
              >
                Все
              </button>
              <button
                type="button"
                className={`filter-button ${todoState.filter === 'active' ? 'active' : ''}`}
                onClick={() => dispatch(TodoActions.setFilter('active'))}
                aria-label="Показать активные задачи"
                aria-pressed={todoState.filter === 'active'}
              >
                Активные
              </button>
              <button
                type="button"
                className={`filter-button ${todoState.filter === 'completed' ? 'active' : ''}`}
                onClick={() => dispatch(TodoActions.setFilter('completed'))}
                aria-label="Показать выполненные задачи"
                aria-pressed={todoState.filter === 'completed'}
              >
                Выполненные
              </button>
            </div>

            <label className="visually-hidden" htmlFor={searchInputId}>
              Поиск по задачам
            </label>
            <input
              id={searchInputId}
              className="todo-search"
              type="text"
              value={todoState.searchQuery}
              placeholder="Поиск по задачам"
              onChange={(event) => dispatch(TodoActions.setSearchQuery(event.target.value))}
              aria-label="Поиск по списку задач"
            />

            <div className="sort-controls">
              <label className="visually-hidden" htmlFor={sortSelectId}>
                Сортировка задач
              </label>
              <select
                id={sortSelectId}
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
                aria-label="Выберите способ сортировки задач"
              >
                <option value="createdAt">Сортировка по дате</option>
                <option value="priority">Сортировка по приоритету</option>
                <option value="text">Сортировка по названию</option>
              </select>
              <button
                type="button"
                className="filter-button"
                onClick={() =>
                  dispatch(
                    TodoActions.setSort(
                      todoState.sortBy,
                      todoState.sortOrder === 'asc' ? 'desc' : 'asc',
                    ),
                  )
                }
                aria-label="Переключить порядок сортировки задач"
              >
                {todoState.sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
              </button>
            </div>
          </div>

          <div className="todo-list" aria-live="polite">
            {visibleTodos.length === 0 ? (
              <div className="empty-state" role="status">
                <h3 className="empty-title">Ничего не найдено</h3>
                <p className="empty-description">
                  Попробуй сменить фильтр или добавить новую задачу.
                </p>
              </div>
            ) : (
              <ul className="todo-items" role="list" aria-label="Список задач">
                {visibleTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    role="listitem"
                  >
                    <label className="todo-checkbox-row">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(TodoActions.toggleTodo(todo.id))}
                        aria-label={
                          todo.completed
                            ? `Отметить задачу "${todo.text}" как невыполненную`
                            : `Отметить задачу "${todo.text}" как выполненную`
                        }
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
                      <label className="visually-hidden" htmlFor={`priority-${todo.id}`}>
                        Приоритет задачи {todo.text}
                      </label>
                      <select
                        id={`priority-${todo.id}`}
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
                        aria-label={`Изменить приоритет задачи ${todo.text}`}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                      <button
                        type="button"
                        className="todo-delete"
                        onClick={() => dispatch(TodoActions.deleteTodo(todo.id))}
                        aria-label={`Удалить задачу ${todo.text}`}
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
          <div className="side-actions" role="group" aria-label="Массовые действия над задачами">
            <button
              type="button"
              className="filter-button active"
              onClick={() => dispatch(TodoActions.toggleAll())}
              aria-label="Переключить состояние всех задач"
            >
              Переключить все
            </button>
            <button
              type="button"
              className="filter-button"
              onClick={() => dispatch(TodoActions.clearCompleted())}
              aria-label="Удалить все выполненные задачи"
            >
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
