import { Ticket } from "./compute";

export function loadDB(): Ticket[] {
    let str = window.localStorage.getItem("tkt_tickets");
    if (str == null) {
        return [];
    }
    return JSON.parse(str);
}

export function saveDB(tickets: Ticket[]) {
    window.localStorage.setItem("tkt_tickets", JSON.stringify(tickets));
}