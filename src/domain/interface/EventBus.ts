export interface EventBus {
    publish<T extends Object>(event: T): void;
    subscribe<T extends Function, E extends Object>(eventName: T, callback: (event: E) => void): void;
  }