/**
 * Базовый класс Action для системы управления состоянием
 * Представляет действие, которое изменяет состояние приложения
 */
export class Action {
  /**
   * Создаёт новый экземпляр Action
   * @param type - Тип действия (например, 'INCREMENT', 'ADD_TODO')
   * @param payload - Дополнительные данные для действия (опционально)
   */
  constructor(
    public readonly type: string,
    public readonly payload?: any
  ) {}

  /**
   * Статический метод для создания действия инкремента
   * @param amount - Величина инкремента (по умолчанию 1)
   */
  static increment(amount: number = 1): Action {
    return new Action('INCREMENT', amount);
  }

  /**
   * Статический метод для создания действия декремента
   * @param amount - Величина декремента (по умолчанию 1)
   */
  static decrement(amount: number = 1): Action {
    return new Action('DECREMENT', amount);
  }

  /**
   * Статический метод для создания действия сброса
   */
  static reset(): Action {
    return new Action('RESET');
  }

  /**
   * Статический метод для создания действия добавления задачи
   * @param text - Текст задачи
   */
  static addTodo(text: string): Action {
    return new Action('ADD_TODO', { text });
  }

  /**
   * Статический метод для создания действия удаления задачи
   * @param id - ID задачи
   */
  static deleteTodo(id: number): Action {
    return new Action('DELETE_TODO', { id });
  }

  /**
   * Статический метод для создания действия переключения статуса задачи
   * @param id - ID задачи
   */
  static toggleTodo(id: number): Action {
    return new Action('TOGGLE_TODO', { id });
  }

  /**
   * Возвращает строковое представление действия
   */
  toString(): string {
    return `Action(type: ${this.type}, payload: ${JSON.stringify(this.payload)})`;
  }
}

/**
 * Интерфейс для типизированных действий
 */
export interface TypedAction<T extends string, P = any> {
  type: T;
  payload?: P;
}

/**
 * Пример типизированного действия для счётчика
 */
export type CounterAction = 
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'RESET' };

/**
 * Пример типизированного действия для списка задач
 */
export type TodoAction = 
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'DELETE_TODO'; payload: { id: number } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'SET_FILTER'; payload: { filter: 'all' | 'active' | 'completed' } };