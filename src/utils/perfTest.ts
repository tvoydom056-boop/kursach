import {
  CounterActions,
  CounterStateReducer,
  initialCounterState,
  type CounterState,
} from '../state/CounterState';
import { Store } from '../state/Store';
import { TodoSelectors, type Todo, type TodoState } from '../state/TodoState';

export interface PerformanceMeasurement {
  scenario: string;
  items: number;
  durationMs: number;
  opsPerSec: number;
}

export interface PerformanceTestResults {
  dispatchResults: PerformanceMeasurement[];
  selectorResults: PerformanceMeasurement[];
}

interface StoreClassStatic {
  instance: Store<unknown> | null;
}

const DISPATCH_SCENARIOS = [1000, 5000, 10000];
const SELECTOR_SCENARIOS = [100, 500, 1000];

function createCounterStore(): Store<CounterState> {
  return Store.getInstance<CounterState>(
    {
      ...initialCounterState,
      history: [initialCounterState.value],
    },
    new CounterStateReducer(),
  );
}

function createTodoState(size: number): TodoState {
  const todos: Todo[] = Array.from({ length: size }, (_, index) => ({
    id: index + 1,
    text: `Performance task ${index + 1}`,
    completed: index % 3 === 0,
    createdAt: new Date(2024, 0, (index % 28) + 1),
    completedAt: index % 3 === 0 ? new Date(2024, 1, (index % 28) + 1) : undefined,
    priority: index % 5 === 0 ? 'high' : index % 2 === 0 ? 'medium' : 'low',
  }));

  return {
    todos,
    filter: 'all',
    searchQuery: 'task',
    sortBy: 'priority',
    sortOrder: 'desc',
    nextId: size + 1,
  };
}

function measureDispatch(store: Store<CounterState>, iterations: number): PerformanceMeasurement {
  store.resetState({
    ...initialCounterState,
    history: [initialCounterState.value],
  });

  const startTime = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    store.dispatch(CounterActions.increment());
  }
  const endTime = performance.now();

  const durationMs = endTime - startTime;

  return {
    scenario: `dispatch(INCREMENT) x${iterations}`,
    items: iterations,
    durationMs,
    opsPerSec: durationMs > 0 ? (iterations / durationMs) * 1000 : Number.POSITIVE_INFINITY,
  };
}

function measureSelector(size: number): PerformanceMeasurement {
  const todoState = createTodoState(size);

  const startTime = performance.now();
  TodoSelectors.getFilteredTodos(todoState);
  const endTime = performance.now();

  const durationMs = endTime - startTime;

  return {
    scenario: `getFilteredTodos() with ${size} todos`,
    items: size,
    durationMs,
    opsPerSec: durationMs > 0 ? 1000 / durationMs : Number.POSITIVE_INFINITY,
  };
}

export function runPerformanceTest(): PerformanceTestResults {
  const storeClass = Store as unknown as StoreClassStatic;
  const previousInstance = storeClass.instance;

  storeClass.instance = null;

  try {
    const temporaryStore = createCounterStore();

    const dispatchResults = DISPATCH_SCENARIOS.map((iterations) =>
      measureDispatch(temporaryStore, iterations),
    );

    const selectorResults = SELECTOR_SCENARIOS.map((size) => measureSelector(size));

    console.table(dispatchResults);
    console.table(selectorResults);

    return {
      dispatchResults,
      selectorResults,
    };
  } finally {
    storeClass.instance = previousInstance;
  }
}
