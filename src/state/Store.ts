import { Action } from './Action';
import { Reducer } from './Reducer';

export interface Subscriber<T> {
  update(state: T): void;
}

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  failedActionType: string | null;
  timestamp: Date | null;
}

export class Store<T> {
  private static instance: Store<any> | null = null;

  private state: T;

  private subscribers: Subscriber<T>[] = [];

  private reducer: Reducer<T>;

  private isDispatching = false;

  private stateHistory: T[] = [];

  private errorState: ErrorState = {
    hasError: false,
    error: null,
    failedActionType: null,
    timestamp: null,
  };

  private readonly maxHistorySize = 50;

  private constructor(initialState: T, reducer: Reducer<T>) {
    this.state = initialState;
    this.reducer = reducer;
    this.stateHistory.push(initialState);
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
    if (this.isDispatching) {
      throw new Error('Нельзя запрашивать состояние во время диспетчеризации');
    }

    return this.state;
  }

  public dispatch(action: Action): void {
    if (this.isDispatching) {
      throw new Error('Рекурсивная диспетчеризация запрещена');
    }

    const previousState = this.state;

    try {
      this.isDispatching = true;

      const newState = this.reducer.reduce(this.state, action);
      this.errorState = {
        hasError: false,
        error: null,
        failedActionType: null,
        timestamp: null,
      };

      this.stateHistory.push(newState);
      if (this.stateHistory.length > this.maxHistorySize) {
        this.stateHistory.shift();
      }

      this.state = newState;
      this.notifySubscribers();
    } catch (error) {
      const normalizedError = error instanceof Error ? error : new Error(String(error));

      this.state = previousState;
      this.errorState = {
        hasError: true,
        error: normalizedError,
        failedActionType: action.type,
        timestamp: new Date(),
      };

      console.error('Ошибка в reducer во время dispatch:', {
        actionType: action.type,
        error: normalizedError,
      });
    } finally {
      this.isDispatching = false;
    }
  }

  public subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  public unsubscribe(subscriber: Subscriber<T>): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  public getStateHistory(): T[] {
    return [...this.stateHistory];
  }

  public getErrorState(): ErrorState {
    return { ...this.errorState };
  }

  public clearErrorState(): void {
    this.errorState = {
      hasError: false,
      error: null,
      failedActionType: null,
      timestamp: null,
    };
  }

  public timeTravel(index: number): void {
    if (index < 0 || index >= this.stateHistory.length) {
      throw new Error('Неверный индекс для time travel');
    }

    this.state = this.stateHistory[index];
    this.notifySubscribers();
  }

  public replaceReducer(nextReducer: Reducer<T>): void {
    this.reducer = nextReducer;
  }

  public notifySubscribers(): void {
    const subscribers = [...this.subscribers];
    subscribers.forEach((subscriber) => {
      try {
        subscriber.update(this.state);
      } catch (error) {
        console.error('Ошибка в подписчике:', error);
      }
    });
  }

  public getSubscriberCount(): number {
    return this.subscribers.length;
  }

  public resetState(newState: T): void {
    this.state = newState;
    this.stateHistory = [newState];
    this.clearErrorState();
    this.notifySubscribers();
  }
}

export function withLogger<T>(store: Store<T>): Store<T> {
  const originalDispatch = store.dispatch.bind(store);

  store.dispatch = function dispatchWithLogger(action: Action): void {
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

export function withThunk<T>(store: Store<T>): Store<T> {
  const originalDispatch = store.dispatch.bind(store);

  store.dispatch = function dispatchWithThunk(action: Action | Function): void {
    if (typeof action === 'function') {
      return action(store.dispatch.bind(store), store.getState.bind(store));
    }

    return originalDispatch(action);
  };

  return store;
}
