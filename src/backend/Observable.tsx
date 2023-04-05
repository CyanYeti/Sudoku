import { Observer } from "../Observer";
abstract class Observable {
    constructor() {
        this.subscribers = []
    }

    private subscribers: Observer[];
    
    public Subscribe(subscriber: Observer) {
        this.subscribers.push(subscriber)
    }
    public Unsubscribe(subscriber: Observer){
        this.subscribers.filter((element) => element !== subscriber)
    }
    protected Notify(state: any) {
        this.subscribers.forEach((element) => element.Update(state))
    }
}

export default Observable