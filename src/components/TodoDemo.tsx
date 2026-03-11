import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoDemo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Изучить основы State Management', completed: true, createdAt: new Date('2024-01-15') },
    { id: 2, text: 'Реализовать демо счётчика', completed: true, createdAt: new Date('2024-01-16') },
    { id: 3, text: 'Создать список задач', completed: false, createdAt: new Date('2024-01-17') },
    { id: 4, text: 'Добавить анимации', completed: false, createdAt: new Date('2024-01-18') },
  ]);
  
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="todo-demo">
      <div className="demo-header">
        <h1 className="demo-title">Демонстрация: Список задач</h1>
        <p className="demo-subtitle">
          Управление коллекцией объектов с операциями добавления, удаления и изменения состояния
        </p>
      </div>

      <div className="todo-container">
        <div className="todo-stats">
          <div className="stat-card">
            <div className="stat-number">{todos.length}</div>
            <div className="stat-label">Всего задач</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{activeCount}</div>
            <div className="stat-label">Активных</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedCount}</div>
            <div className="stat-label">Выполненных</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Math.round((completedCount / todos.length) * 100) || 0}%</div>
            <div className="stat-label">Прогресс</div>
          </div>
        </div>

        <div className="todo-input-section">
          <div className="input-group">
            <input
              type="text"
              className="todo-input"
              placeholder="Добавьте новую задачу..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            />
            <button className="add-button" onClick={addTodo}>
              ➕ Добавить
            </button>
          </div>
        </div>

        <div className="todo-filters">
          <div className="filter-buttons">
            <button 
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все ({todos.length})
            </button>
            <button 
              className={`filter-button ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Активные ({activeCount})
            </button>
            <button 
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Выполненные ({completedCount})
            </button>
          </div>
          <button className="clear-button" onClick={clearCompleted}>
            🗑️ Очистить выполненные
          </button>
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">Задачи не найдены</h3>
              <p className="empty-description">
                {filter === 'completed' 
                  ? 'Нет выполненных задач' 
                  : filter === 'active' 
                    ? 'Нет активных задач' 
                    : 'Список задач пуст. Добавьте первую задачу!'}
              </p>
            </div>
          ) : (
            <ul className="todo-items">
              {filteredTodos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-checkbox">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      id={`todo-${todo.id}`}
                    />
                    <label htmlFor={`todo-${todo.id}`}></label>
                  </div>
                  <div className="todo-content">
                    <div className="todo-text">{todo.text}</div>
                    <div className="todo-meta">
                      <span className="todo-date">
                        📅 {todo.createdAt.toLocaleDateString()}
                      </span>
                      <span className="todo-status">
                        {todo.completed ? '✅ Выполнено' : '🔄 В процессе'}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="todo-delete"
                    onClick={() => deleteTodo(todo.id)}
                    title="Удалить задачу"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="state-diagram">
          <h3 className="diagram-title">Структура состояния:</h3>
          <div className="diagram-content">
            <pre className="state-structure">
{`TodoState {
  todos: Array<{
    id: number,
    text: string,
    completed: boolean,
    createdAt: Date
  }>,
  filter: 'all' | 'active' | 'completed',
  stats: {
    total: number,
    active: number,
    completed: number,
    progress: number
  }
}`}
            </pre>
          </div>
        </div>

        <div className="explanation-section">
          <h3 className="explanation-title">State Management в действии:</h3>
          <div className="explanation-content">
            <p>
              Этот демо-пример показывает, как <strong>State Management</strong> работает с коллекциями объектов:
            </p>
            <ul>
              <li><strong>Добавление задачи</strong> — создание нового объекта и добавление в массив</li>
              <li><strong>Изменение статуса</strong> — обновление свойства объекта в массиве</li>
              <li><strong>Удаление задачи</strong> — фильтрация массива по id</li>
              <li><strong>Фильтрация</strong> — производные состояния на основе основного состояния</li>
            </ul>
            <p className="code-example">
              <code>ADD_TODO → reducer добавляет новый объект в массив todos</code><br />
              <code>TOGGLE_TODO → reducer изменяет completed у определённого объекта</code><br />
              <code>DELETE_TODO → reducer фильтрует массив todos</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDemo;