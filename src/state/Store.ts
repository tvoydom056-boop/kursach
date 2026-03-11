import { Action } from './Action';
import { Reducer } from './Reducer';

/**
 * Интерфейс подписчика на изменения состояния
 */
export interface Subscriber<T> {
  /**
   * Метод, вызываемый при изменении состояния
   * @param state - Новое состояние
   */
  update(state: T): void;
}

/**
 * Класс Store - централизованное хранилище состояния (Singleton)
 * Управляет состоянием приложения, обработкой действий и уведомлением подписчиков
 */
export class Store<T> {
  private static instance: Store<any> | null = null;
  private state: T;
  private subscribers: Subscriber<T>[] = [];
  private reducer: Reducer<T>;
  private isDispatching = false;
  private stateHistory: T[] = [];
  private readonly maxHistorySize = 50;

  /**
   * Приватный конструктор (Singleton паттерн)
   * @param initialState - Начальное состояние
   * @param reducer - Редьюсер для обработки действий
   */
  private constructor(initialState: T, reducer: Reducer<T>) {
    this.state = initialState;
    this.reducer = reducer;
    this.stateHistory.push(initialState);
  }

  /**
   * Статический метод для получения экземпляра Store (Singleton)
   * @param initialState - Начальное состояние (требуется при первом вызове)
   * @param reducer - Редьюсер (требуется при первом вызове)
   */
  public static getInstance<T>(initialState?: T, reducer?: Reducer<T>): Store<T> {
    if (!Store.instance) {
      if (!initialState || !reducer) {
        throw new Error('Для первого создания Store необходимо предоставить initialState и reducer');
      }
      Store.instance = new Store(initialState, reducer);
    }
    return Store.instance as Store<T>;
  }

  /**
   * Возвращает текущее состояние
   */
  public getState(): T {
    if (this.isDispatching) {
      throw new Error('Нельзя запрашивать состояние во время диспетчеризации');
    }
    return this.state;
  }

  /**
   * Диспетчеризация действия для изменения состояния
   * @param action - Действие для обработки
   */
  public dispatch(action: Action): void {
    if (this.isDispatching) {
      throw new Error('Рекурсивная диспетчеризация запрещена');
    }

    try {
      this.isDispatching = true;
      
      // Обработка действия через редьюсер
      const newState = this.reducer.reduce(this.state, action);
      
      // Сохранение в историю
      this.stateHistory.push(newState);
      if (this.stateHistory.length > this.maxHistorySize) {
        this.stateHistory.shift();
      }
      
      // Обновление состояния
      this.state = newState;
      
      // Уведомление подписчиков
      this.notifySubscribers();
    } finally {
      this.isDispatching = false;
    }
  }

  /**
   * Подписка на изменения состояния
   * @param subscriber - Подписчик
   */
  public subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.push(subscriber);
    
    // Возвращаем функцию отписки
    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  /**
   * Отмена подписки на изменения состояния
   * @param subscriber - Подписчик для отписки
   */
  public unsubscribe(subscriber: Subscriber<T>): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  /**
   * Возвращает историю состояний
   */
  public getStateHistory(): T[] {
    return [...this.stateHistory];
  }

  /**
   * Возможность "путешествия во времени" - восстановление состояния из истории
   * @param index - Индекс состояния в истории
   */
  public timeTravel(index: number): void {
    if (index < 0 || index >= this.stateHistory.length) {
      throw new Error('Неверный индекс для time travel');
    }
    
    this.state = this.stateHistory[index];
    this.notifySubscribers();
  }

  /**
   * Замена редьюсера (hot reload)
   * @param nextReducer - Новый редьюсер
   */
  public replaceReducer(nextReducer: Reducer<T>): void {
    this.reducer = nextReducer;
  }

  /**
   * Принудительное уведомление всех подписчиков
   */
  public notifySubscribers(): void {
    // Копируем массив подписчиков на случай, если они будут изменяться во время уведомления
    const subscribers = [...this.subscribers];
    subscribers.forEach(subscriber => {
      try {
        subscriber.update(this.state);
      } catch (error) {
        console.error('Ошибка в подписчике:', error);
      }
    });
  }

  /**
   * Возвращает количество подписчиков (для отладки)
   */
  public getSubscriberCount(): number {
    return this.subscribers.length;
  }

  /**
   * Сброс состояния (для тестирования)
   * @param newState - Новое начальное состояние
   */
  public resetState(newState: T): void {
    this.state = newState;
    this.stateHistory = [newState];
    this.notifySubscribers();
  }
}

/**
 * Декоратор для логирования действий (Middleware паттерн)
 */
export function withLogger<T>(store: Store<T>): Store<T> {
  const originalDispatch = store.dispatch.bind(store);
  
  store.dispatch = function(action: Action): void {
    console.group('Action Dispatched');
    console.log('Type:', action.type);
    console.log('Payload:', action.payload);
    console.log('Previous State:', store.getState());
    
    const result = originalDispatch(action);
    
    console.log('Next State:', store.getState());
    console.groupEnd();
    
    return result;
  };
  
  return store;
}

/**
 * Декоратор для поддержки асинхронных действий
 */
export function withThunk<T>(store: Store<T>): Store<T> {
  const originalDispatch = store.dispatch.bind(store);
  
  store.dispatch = function(action: any): void {
    if (typeof action === 'function') {
      // Если action - функция, вызываем её с dispatch и getState
      return action(store.dispatch.bind(store), store.getState.bind(store));
    }
    
    // Иначе вызываем оригинальный dispatch
    return originalDispatch(action);
  };
  
  return store;
}