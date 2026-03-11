import { Action } from './Action';
import { Reducer } from './Reducer';

/**
 * Интерфейс отдельной задачи
 */
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

/**
 * Интерфейс состояния списка задач
 */
export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
  sortBy: 'createdAt' | 'priority' | 'text';
  sortOrder: 'asc' | 'desc';
  nextId: number;
}

/**
 * Начальное состояние списка задач
 */
export const initialTodoState: TodoState = {
  todos: [
    {
      id: 1,
      text: 'Изучить основы State Management',
      completed: true,
      createdAt: new Date('2024-01-15'),
      completedAt: new Date('2024-01-16'),
      priority: 'high',
    },
    {
      id: 2,
      text: 'Реализовать демо счётчика',
      completed: true,
      createdAt: new Date('2024-01-16'),
      completedAt: new Date('2024-01-17'),
      priority: 'high',
    },
    {
      id: 3,
      text: 'Создать список задач',
      completed: false,
      createdAt: new Date('2024-01-17'),
      priority: 'medium',
    },
    {
      id: 4,
      text: 'Добавить анимации',
      completed: false,
      createdAt: new Date('2024-01-18'),
      priority: 'low',
    },
  ],
  filter: 'all',
  searchQuery: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  nextId: 5,
};

/**
 * Действия для списка задач
 */
export const TodoActions = {
  addTodo: (text: string, priority: Todo['priority'] = 'medium') => 
    new Action('ADD_TODO', { text, priority }),
  
  deleteTodo: (id: number) => 
    new Action('DELETE_TODO', { id }),
  
  toggleTodo: (id: number) => 
    new Action('TOGGLE_TODO', { id }),
  
  editTodo: (id: number, text: string) => 
    new Action('EDIT_TODO', { id, text }),
  
  setFilter: (filter: TodoState['filter']) => 
    new Action('SET_FILTER', { filter }),
  
  setSearchQuery: (query: string) => 
    new Action('SET_SEARCH_QUERY', { query }),
  
  setSort: (sortBy: TodoState['sortBy'], sortOrder: TodoState['sortOrder']) => 
    new Action('SET_SORT', { sortBy, sortOrder }),
  
  clearCompleted: () => 
    new Action('CLEAR_COMPLETED'),
  
  toggleAll: () => 
    new Action('TOGGLE_ALL'),
  
  setPriority: (id: number, priority: Todo['priority']) => 
    new Action('SET_PRIORITY', { id, priority }),
};

/**
 * Редьюсер для списка задач
 */
export class TodoStateReducer extends Reducer<TodoState> {
  reduce(state: TodoState, action: Action): TodoState {
    switch (action.type) {
      case 'ADD_TODO': {
        const newTodo: Todo = {
          id: state.nextId,
          text: action.payload.text,
          completed: false,
          createdAt: new Date(),
          priority: action.payload.priority || 'medium',
        };
        
        return {
          ...state,
          todos: [...state.todos, newTodo],
          nextId: state.nextId + 1,
        };
      }
      
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload.id),
        };
      
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? new Date() : undefined,
                }
              : todo
          ),
        };
      
      case 'EDIT_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, text: action.payload.text }
              : todo
          ),
        };
      
      case 'SET_FILTER':
        return {
          ...state,
          filter: action.payload.filter,
        };
      
      case 'SET_SEARCH_QUERY':
        return {
          ...state,
          searchQuery: action.payload.query,
        };
      
      case 'SET_SORT':
        return {
          ...state,
          sortBy: action.payload.sortBy,
          sortOrder: action.payload.sortOrder,
        };
      
      case 'CLEAR_COMPLETED':
        return {
          ...state,
          todos: state.todos.filter(todo => !todo.completed),
        };
      
      case 'TOGGLE_ALL': {
        const allCompleted = state.todos.every(todo => todo.completed);
        
        return {
          ...state,
          todos: state.todos.map(todo => ({
            ...todo,
            completed: !allCompleted,
            completedAt: !allCompleted ? new Date() : undefined,
          })),
        };
      }
      
      case 'SET_PRIORITY':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload.id
              ? { ...todo, priority: action.payload.priority }
              : todo
          ),
        };
      
      default:
        return state;
    }
  }
}

/**
 * Селекторы для состояния списка задач
 */
export const TodoSelectors = {
  // Базовые селекторы
  getAllTodos: (state: TodoState) => state.todos,
  getFilter: (state: TodoState) => state.filter,
  getSearchQuery: (state: TodoState) => state.searchQuery,
  getSortConfig: (state: TodoState) => ({ sortBy: state.sortBy, sortOrder: state.sortOrder }),
  
  // Фильтрованные задачи
  getFilteredTodos: (state: TodoState): Todo[] => {
    let filtered = state.todos;
    
    // Применение фильтра
    if (state.filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (state.filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }
    
    // Применение поиска
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(todo => 
        todo.text.toLowerCase().includes(query)
      );
    }
    
    // Сортировка
    filtered = [...filtered].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (state.sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        
        case 'text':
          aValue = a.text.toLowerCase();
          bValue = b.text.toLowerCase();
          break;
        
        case 'createdAt':
        default:
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
      }
      
      if (state.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return filtered;
  },
  
  // Статистика
  getStats: (state: TodoState) => {
    const total = state.todos.length;
    const completed = state.todos.filter(t => t.completed).length;
    const active = total - completed;
    const progress = total > 0 ? (completed / total) * 100 : 0;
    
    return { total, completed, active, progress };
  },
  
  // Приоритеты
  getTodosByPriority: (state: TodoState) => {
    const byPriority = {
      high: state.todos.filter(t => t.priority === 'high'),
      medium: state.todos.filter(t => t.priority === 'medium'),
      low: state.todos.filter(t => t.priority === 'low'),
    };
    
    return byPriority;
  },
  
  // Поиск задачи по ID
  getTodoById: (state: TodoState, id: number): Todo | undefined => {
    return state.todos.find(todo => todo.id === id);
  },
};

/**
 * Вспомогательные функции для работы со списком задач
 */
export const TodoHelpers = {
  formatDate: (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
  
  getPriorityIcon: (priority: Todo['priority']): string => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  },
  
  getPriorityLabel: (priority: Todo['priority']): string => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Не указан';
    }
  },
  
  getStatusIcon: (completed: boolean): string => {
    return completed ? '✅' : '🔄';
  },
  
  calculateCompletionTime: (createdAt: Date, completedAt?: Date): string => {
    if (!completedAt) return 'В процессе';
    
    const diffMs = completedAt.getTime() - createdAt.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} ч`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} д`;
    }
  },
};