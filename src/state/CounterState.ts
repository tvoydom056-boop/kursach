import { Action } from './Action';
import { Reducer } from './Reducer';

/**
 * Интерфейс состояния счётчика
 */
export interface CounterState {
  value: number;
  step: number;
  history: number[];
  maxHistorySize: number;
}

/**
 * Начальное состояние счётчика
 */
export const initialCounterState: CounterState = {
  value: 0,
  step: 1,
  history: [0],
  maxHistorySize: 20,
};

/**
 * Действия для счётчика
 */
export const CounterActions = {
  increment: (amount?: number) => new Action('INCREMENT', amount),
  decrement: (amount?: number) => new Action('DECREMENT', amount),
  reset: () => new Action('RESET'),
  setStep: (step: number) => new Action('SET_STEP', step),
  undo: () => new Action('UNDO'),
};

/**
 * Редьюсер для счётчика
 */
export class CounterStateReducer extends Reducer<CounterState> {
  reduce(state: CounterState, action: Action): CounterState {
    switch (action.type) {
      case 'INCREMENT': {
        const amount = action.payload || state.step;
        const newValue = state.value + amount;
        const newHistory = [...state.history, newValue];
        
        if (newHistory.length > state.maxHistorySize) {
          newHistory.shift();
        }
        
        return {
          ...state,
          value: newValue,
          history: newHistory,
        };
      }
      
      case 'DECREMENT': {
        const amount = action.payload || state.step;
        const newValue = state.value - amount;
        const newHistory = [...state.history, newValue];
        
        if (newHistory.length > state.maxHistorySize) {
          newHistory.shift();
        }
        
        return {
          ...state,
          value: newValue,
          history: newHistory,
        };
      }
      
      case 'RESET':
        return {
          ...state,
          value: 0,
          history: [0],
        };
      
      case 'SET_STEP':
        return {
          ...state,
          step: Math.max(1, action.payload),
        };
      
      case 'UNDO': {
        if (state.history.length <= 1) {
          return state;
        }
        
        const newHistory = state.history.slice(0, -1);
        const previousValue = newHistory[newHistory.length - 1];
        
        return {
          ...state,
          value: previousValue,
          history: newHistory,
        };
      }
      
      default:
        return state;
    }
  }
}

/**
 * Селекторы для состояния счётчика
 */
export const CounterSelectors = {
  getValue: (state: CounterState) => state.value,
  getStep: (state: CounterState) => state.step,
  getHistory: (state: CounterState) => state.history,
  getHistoryLength: (state: CounterState) => state.history.length,
  canUndo: (state: CounterState) => state.history.length > 1,
  getPreviousValue: (state: CounterState) => 
    state.history.length > 1 ? state.history[state.history.length - 2] : null,
  getChangeFromPrevious: (state: CounterState) => 
    state.history.length > 1 ? state.history[state.history.length - 1] - state.history[state.history.length - 2] : 0,
};

/**
 * Вспомогательные функции для работы со счётчиком
 */
export const CounterHelpers = {
  formatValue: (value: number): string => {
    return value.toLocaleString('ru-RU');
  },
  
  getChangeIcon: (change: number): string => {
    if (change > 0) return '↗';
    if (change < 0) return '↘';
    return '→';
  },
  
  getChangeColor: (change: number): string => {
    if (change > 0) return '#4cc9f0';
    if (change < 0) return '#f94144';
    return '#888888';
  },
  
  calculateStats: (history: number[]) => {
    if (history.length === 0) {
      return { min: 0, max: 0, average: 0, totalChanges: 0 };
    }
    
    const min = Math.min(...history);
    const max = Math.max(...history);
    const sum = history.reduce((acc, val) => acc + val, 0);
    const average = sum / history.length;
    
    let totalChanges = 0;
    for (let i = 1; i < history.length; i++) {
      totalChanges += Math.abs(history[i] - history[i - 1]);
    }
    
    return { min, max, average, totalChanges };
  },
};