import { customElement, html, LitElement, property } from 'lit-element';
import { AddTicketEvent } from './add-ticket-form';
import { Ticket } from './compute';
import { getStore } from "./db";
import { RemoveTicketEvent } from './ticket-list';

@customElement("tkt-main")
export class Main extends LitElement {

    @property({ type: Array })
    state: Ticket[] = [];

    firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
        super.firstUpdated(changedProperties);
        let store = getStore();
        store.subscribe((state) => this.updateState(state))
        store.init();
    }

    updateState(state: Ticket[]) {
        this.state = state;
        this.requestUpdate();
    }

    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="style/style.css" />
        <h1 class="app-name">
            <img src="/tkt/img/icon192-inverse.png" class="app-logo" />
            <span>Tickets répartis</span>
        </h1>
        <tkt-ticket-list .tickets=${this.state} @tkt-remove-ticket=${this.removeTicket}>
        </tkt-ticket-list>
        <tkt-add-ticket @tkt-add-ticket=${this.addTicket}></tkt-add-ticket>
        `;
    }

    addTicket(e: AddTicketEvent) {
        getStore().addTicket(e.detail.value, e.detail.quantity);
    }

    removeTicket(e: RemoveTicketEvent) {
        getStore().removeTicket(e.detail.index);
    }
}
