import './style.css'

// Простая реализация State Management системы на ООП
// ==================================================

// 1. Базовый класс Action
class Action {
  constructor(
    public readonly type: string,
    public readonly payload?: any
  ) {}
}

// 2. Абстрактный класс Reducer
abstract class Reducer<T> {
  abstract reduce(state: T, action: Action): T;
}

// 3. Интерфейс подписчика
interface Subscriber<T> {
  update(state: T): void;
}

// 4. Класс Store (Singleton)
class Store<T> {
  private static instance: Store<any> | null = null;
  private state: T;
  private subscribers: Subscriber<T>[] = [];
  private reducer: Reducer<T>;

  private constructor(initialState: T, reducer: Reducer<T>) {
    this.state = initialState;
    this.reducer = reducer;
  }

  public static getInstance<T>(initialState?: T, reducer?: Reducer<T>): Store<T> {
    if (!Store.instance) {
      if (!initialState || !reducer) {
        throw new Error('Для первого создания Store необходимо предоставить initialState и reducer');
      }
      Store.instance = new Store(initialState, reducer);
    }
    return Store.instance as Store<T>;
  }

  public getState(): T {
    return this.state;
  }

  public dispatch(action: Action): void {
    console.log(`📤 Dispatching action: ${action.type}`, action.payload);
    const newState = this.reducer.reduce(this.state, action);
    
    if (newState !== this.state) {
      this.state = newState;
      this.notifySubscribers();
    }
  }

  public subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.push(subscriber);
    
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  private notifySubscribers(): void {
    console.log(`📨 Notifying ${this.subscribers.length} subscribers`);
    this.subscribers.forEach(subscriber => {
      subscriber.update(this.state);
    });
  }

  public static reset(): void {
    Store.instance = null;
  }
}

// ==================================================
// Демонстрация: Счетчик
// ==================================================

// Состояние счетчика
interface CounterState {
  count: number;
  history: number[];
}

// Действия для счетчика
class IncrementAction extends Action {
  constructor() {
    super('INCREMENT');
  }
}

class DecrementAction extends Action {
  constructor() {
    super('DECREMENT');
  }
}

class ResetAction extends Action {
  constructor() {
    super('RESET');
  }
}

// Reducer для счетчика
class CounterReducer extends Reducer<CounterState> {
  reduce(state: CounterState, action: Action): CounterState {
    let newCount = state.count;
    
    switch (action.type) {
      case 'INCREMENT':
        newCount = state.count + 1;
        break;
        
      case 'DECREMENT':
        newCount = state.count - 1;
        break;
        
      case 'RESET':
        newCount = 0;
        break;
        
      default:
        return state;
    }
    
    const newHistory = [...state.history, state.count].slice(-10);
    
    return {
      count: newCount,
      history: newHistory
    };
  }
}

// Начальное состояние
const initialCounterState: CounterState = {
  count: 0,
  history: []
};

// Компонент счетчика
class CounterApp implements Subscriber<CounterState> {
  private store: Store<CounterState>;
  private container: HTMLElement;
  private unsubscribe: () => void;

  constructor(containerId: string) {
    Store.reset(); // Сбрасываем для чистой демонстрации
    this.store = Store.getInstance<CounterState>(
      initialCounterState,
      new CounterReducer()
    );
    
    this.container = document.getElementById(containerId)!;
    this.render();
    
    this.unsubscribe = this.store.subscribe(this);
  }

  update(state: CounterState): void {
    console.log('CounterApp: State updated', state);
    this.render();
  }

  private render(): void {
    const state = this.store.getState();

    this.container.innerHTML = `
      <div class="counter-app">
        <h2>🧮 Счетчик (Counter)</h2>
        
        <div class="counter-display">
          <div class="counter-value">${state.count}</div>
          <div class="counter-history">
            История: [${state.history.join(', ')}]
          </div>
        </div>
        
        <div class="counter-controls">
          <button id="decrement-btn">-</button>
          <button id="reset-btn">Сбросить</button>
          <button id="increment-btn">+</button>
        </div>
        
        <div class="counter-info">
          <p><strong>Демонстрация работы State Management системы:</strong></p>
          <ul>
            <li><strong>Store (Singleton)</strong> — центральное хранилище состояния</li>
            <li><strong>Action</strong> — абстракция для действия (тип + данные)</li>
            <li><strong>Reducer</strong> — стратегия для изменения состояния</li>
            <li><strong>Subscriber/Observer</strong> — подписчики на изменения Store</li>
          </ul>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const incrementBtn = this.container.querySelector('#increment-btn');
    const decrementBtn = this.container.querySelector('#decrement-btn');
    const resetBtn = this.container.querySelector('#reset-btn');

    incrementBtn?.addEventListener('click', () => {
      this.store.dispatch(new IncrementAction());
    });

    decrementBtn?.addEventListener('click', () => {
      this.store.dispatch(new DecrementAction());
    });

    resetBtn?.addEventListener('click', () => {
      this.store.dispatch(new ResetAction());
    });
  }

  public destroy(): void {
    this.unsubscribe();
  }
}

// ==================================================
// Демонстрация: Список задач
// ==================================================

// Интерфейс задачи
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Состояние списка задач
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

// Действия для задач
class AddTodoAction extends Action {
  constructor(text: string) {
    super('ADD_TODO', { text });
  }
}

class ToggleTodoAction extends Action {
  constructor(id: number) {
    super('TOGGLE_TODO', { id });
  }
}

// Reducer для задач
class TodoReducer extends Reducer<TodoState> {
  private static nextId = 1;

  reduce(state: TodoState, action: Action): TodoState {
    switch (action.type) {
      case 'ADD_TODO':
        const newTodo: Todo = {
          id: TodoReducer.nextId++,
          text: action.payload.text,
          completed: false
        };
        return {
          ...state,
          todos: [...state.todos, newTodo]
        };

      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        };

      default:
        return state;
    }
  }
}

// Начальное состояние
const initialTodoState: TodoState = {
  todos: [
    { id: 1, text: 'Изучить ООП', completed: true },
    { id: 2, text: 'Реализовать State Management', completed: false },
    { id: 3, text: 'Создать демо-приложение', completed: false }
  ],
  filter: 'all'
};

// Компонент списка задач
class TodoApp implements Subscriber<TodoState> {
  private store: Store<TodoState>;
  private container: HTMLElement;
  private unsubscribe: () => void;

  constructor(containerId: string) {
    // Используем тот же Store (Singleton), но с другим состоянием
    // В реальной системе было бы несколько Store, но для демо используем один
    this.store = Store.getInstance<TodoState>(
      initialTodoState,
      new TodoReducer()
    );
    
    this.container = document.getElementById(containerId)!;
    this.render();
    
    this.unsubscribe = this.store.subscribe(this);
  }

  update(state: TodoState): void {
    console.log('TodoApp: State updated', state);
    this.render();
  }

  private render(): void {
    const state = this.store.getState();

    this.container.innerHTML = `
      <div class="todo-app">
        <h2>✅ Список задач (Todo List)</h2>
        
        <div class="todo-form">
          <input type="text" id="todo-input" placeholder="Добавить новую задачу..." />
          <button id="add-todo-btn">Добавить</button>
        </div>
        
        <ul class="todo-list">
          ${state.todos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
              <input type="checkbox" ${todo.completed ? 'checked' : ''} />
              <span class="todo-text">${todo.text}</span>
            </li>
          `).join('')}
        </ul>
        
        <div class="stats">
          Всего задач: ${state.todos.length} | 
          Активных: ${state.todos.filter(t => !t.completed).length} | 
          Завершенных: ${state.todos.filter(t => t.completed).length}
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const addButton = this.container.querySelector('#add-todo-btn');
    const input = this.container.querySelector('#todo-input') as HTMLInputElement;
    
    addButton?.addEventListener('click', () => {
      if (input.value.trim()) {
        this.store.dispatch(new AddTodoAction(input.value.trim()));
        input.value = '';
      }
    });

    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        this.store.dispatch(new AddTodoAction(input.value.trim()));
        input.value = '';
      }
    });

    const todoItems = this.container.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
      const id = parseInt(item.getAttribute('data-id')!);
      const checkbox = item.querySelector('input[type="checkbox"]');
      
      checkbox?.addEventListener('change', () => {
        this.store.dispatch(new ToggleTodoAction(id));
      });
    });
  }

  public destroy(): void {
    this.unsubscribe();
  }
}

// ==================================================
// Основное приложение
// ==================================================

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app-header">
    <h1>📦 Клиентская система управления состоянием (State Management)</h1>
    <p class="subtitle">Реализация на ООП-принципах (упрощенный Redux/MobX)</p>
  </div>
  
  <div class="demo-container">
    <div id="todo-app-container" class="demo-app"></div>
    <div id="counter-app-container" class="demo-app"></div>
  </div>
  
  <div class="system-info card">
    <h3>🏗️ Архитектура системы:</h3>
    <ul>
      <li><strong>Store (Singleton)</strong> — центральное хранилище состояния</li>
      <li><strong>Action</strong> — абстракция для действия (тип + данные)</li>
      <li><strong>Reducer</strong> — стратегия для изменения состояния</li>
      <li><strong>Subscriber/Observer</strong> — компоненты, подписанные на изменения Store</li>
    </ul>
    <p>Система демонстрирует паттерны: <em>Singleton, Observer, Strategy, Command</em></p>
    <p>Откройте консоль браузера (F12) чтобы видеть логи работы системы</p>
  </div>
`

// Инициализация демо-приложений
const todoApp = new TodoApp('todo-app-container');
const counterApp = new CounterApp('counter-app-container');

console.log('🚀 State Management система инициализирована!');
console.log('Проверьте работу системы в интерфейсе и консоли браузера.');