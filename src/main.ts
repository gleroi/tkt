import { customElement, html, LitElement, property } from 'lit-element';
import "./add-ticket-form";
import { AddTicketEvent } from './add-ticket-form';
import { compute, Result, Ticket } from './compute';
import { getStore } from "./db";
import "./price-input";
import { SubmitPriceEvent } from './price-input';
import "./results-list";
import "./ticket-list";
import { RemoveTicketEvent } from './ticket-list';

@customElement("tkt-main")
export class Main extends LitElement {

    @property({ type: Array })
    tickets: Ticket[] = [];

    @property({ type: Array })
    results: Result[] = [];

    @property({ type: Number })
    price: number = 0

    firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
        super.firstUpdated(changedProperties);
        let store = getStore();
        store.subscribe((state) => this.updateState(state))
        store.init();
    }

    updateState(state: Ticket[]) {
        this.tickets = state;
        this.requestUpdate();
    }

    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="style/style.css" />
        <h1 class="app-name">
            <img src="/tkt/img/icon192-inverse.png" class="app-logo" />
            <span>Tickets répartis</span>
        </h1>
        <tkt-price-input @tkt-submit-price=${this.submitPrice}></tkt-price-input>
        <tkt-ticket-list .tickets=${this.tickets} @tkt-remove-ticket=${this.removeTicket}>
        </tkt-ticket-list>
        <tkt-add-ticket @tkt-add-ticket=${this.addTicket}></tkt-add-ticket>
        <tkt-results-list .tickets=${this.tickets} .price=${this.price} .results=${this.results}></tkt-results-list>
        `;
    }

    addTicket(e: AddTicketEvent) {
        getStore().addTicket(e.detail.value, e.detail.quantity);
    }

    removeTicket(e: RemoveTicketEvent) {
        getStore().removeTicket(e.detail.index);
    }

    submitPrice(e: SubmitPriceEvent) {
        this.price = e.detail.price;
        this.results = compute(this.price, this.tickets);
    }
}
