import { Reducer } from './Reducer';
import { Store } from './Store';
import {
  CounterActions,
  CounterSelectors,
  CounterStateReducer,
  initialCounterState,
} from './CounterState';
import {
  TodoActions,
  TodoSelectors,
  TodoStateReducer,
  initialTodoState,
} from './TodoState';

export interface RootState {
  counter: typeof initialCounterState;
  todos: typeof initialTodoState;
}

class RootReducer extends Reducer<RootState> {
  private readonly counterReducer = new CounterStateReducer();
  private readonly todoReducer = new TodoStateReducer();

  reduce(state: RootState, action: import('./Action').Action): RootState {
    return {
      counter: this.counterReducer.reduce(state.counter, action),
      todos: this.todoReducer.reduce(state.todos, action),
    };
  }
}

export const initialRootState: RootState = {
  counter: initialCounterState,
  todos: initialTodoState,
};

export const appStore = Store.getInstance<RootState>(
  initialRootState,
  new RootReducer(),
);

export { CounterActions, CounterSelectors, TodoActions, TodoSelectors };
