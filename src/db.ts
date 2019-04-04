import { Ticket } from "./compute";

type Subscriber = (state: Ticket[]) => void;

export class Store {
    subscribers: Subscriber[] = [];
    subscribe(cb: Subscriber) {
        this.subscribers.push(cb);
    }

    private callSubscribers() {
        for (let cb of this.subscribers) {
            cb(this.tickets);
        }
    }

    tickets: Ticket[] = [];

    init() {
        this.tickets = loadDB();
        this.callSubscribers();
    }

    addTicket(value: number, quantity: number) {
        this.tickets.push({ value, quantity });
        saveDB(this.tickets);
        this.callSubscribers();
    }

    removeTicket(index: number) {
        this.tickets.splice(index, 1);
        saveDB(this.tickets);
        this.callSubscribers();
    }
}

let singletonStore = new Store();

export function getStore(): Store {
    return singletonStore;
}

function loadDB(): Ticket[] {
    let str = window.localStorage.getItem("tkt_tickets");
    if (str == null) {
        return [];
    }
    return JSON.parse(str);
}

function saveDB(tickets: Ticket[]) {
    window.localStorage.setItem("tkt_tickets", JSON.stringify(tickets));
}