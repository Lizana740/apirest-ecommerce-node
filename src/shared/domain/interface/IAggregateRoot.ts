export interface IAggregateRoot<E, P> {
    create(props: P): E;
}