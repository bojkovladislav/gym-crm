interface Props<T> {
    person: T;
}

export default function Person<T>({ person }: Props<T>) {
    return <div></div>;
}
