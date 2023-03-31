import { Observer } from "../Observer";
export interface Observable {
    subscribers: Observer;
    Subscribe(subscriber: Observer): void;
    Unsubscribe(subscriber: Observer): void;
    Notify(): void;
}