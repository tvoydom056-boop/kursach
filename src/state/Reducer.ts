import { Action } from './Action';

/**
 * Абстрактный класс Reducer для системы управления состоянием
 * Определяет контракт для обработчиков действий
 */
export abstract class Reducer<T> {
  /**
   * Абстрактный метод reduce, который должен быть реализован в наследниках
   * @param state - Текущее состояние
   * @param action - Действие для обработки
   * @returns Новое состояние
   */
  abstract reduce(state: T, action: Action): T;

  /**
   * Вспомогательный метод для объединения нескольких редьюсеров
   * @param reducers - Объект с редьюсерами для разных частей состояния
   */
  static combineReducers<S>(reducers: { [K in keyof S]: Reducer<S[K]> }): Reducer<S> {
    return new (class CombinedReducer extends Reducer<S> {
      reduce(state: S, action: Action): S {
        const newState = { ...state };
        let hasChanged = false;

        for (const key in reducers) {
          if (reducers.hasOwnProperty(key)) {
            const reducer = reducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer.reduce(previousStateForKey, action);

            if (nextStateForKey !== previousStateForKey) {
              newState[key] = nextStateForKey;
              hasChanged = true;
            }
          }
        }

        return hasChanged ? newState : state;
      }
    })();
  }
}

/**
 * Пример реализации редьюсера для счётчика
 */
export class CounterReducer extends Reducer<number> {
  reduce(state: number, action: Action): number {
    switch (action.type) {
      case 'INCREMENT':
        return state + (action.payload || 1);
      case 'DECREMENT':
        return state - (action.payload || 1);
      case 'RESET':
        return 0;
      default:
        return state;
    }
  }
}

/**
 * Интерфейс состояния списка задач
 */
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

/**
 * Реализация редьюсера для списка задач
 */
export class TodoReducer extends Reducer<TodoState> {
  reduce(state: TodoState, action: Action): TodoState {
    switch (action.type) {
      case 'ADD_TODO':
        const newTodo: Todo = {
          id: Date.now(),
          text: action.payload.text,
          completed: false,
          createdAt: new Date(),
        };
        return {
          ...state,
          todos: [...state.todos, newTodo],
        };

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
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        };

      case 'SET_FILTER':
        return {
          ...state,
          filter: action.payload.filter,
        };

      case 'CLEAR_COMPLETED':
        return {
          ...state,
          todos: state.todos.filter(todo => !todo.completed),
        };

      default:
        return state;
    }
  }
}

/**
 * Интерфейс корневого состояния приложения
 */
export interface AppState {
  counter: number;
  todos: TodoState;
  // Можно добавить другие части состояния
}

/**
 * Корневой редьюсер, объединяющий все редьюсеры приложения
 */
export class AppReducer extends Reducer<AppState> {
  private counterReducer = new CounterReducer();
  private todoReducer = new TodoReducer();

  reduce(state: AppState, action: Action): AppState {
    return {
      counter: this.counterReducer.reduce(state.counter, action),
      todos: this.todoReducer.reduce(state.todos, action),
    };
  }
}