import { customElement, html, LitElement, property } from 'lit-element';
import { Ticket } from "./compute";
import { getStore } from "./db";

@customElement("tkt-ticket-list")
export class TicketList extends LitElement {

    @property({ type: Array })
    tickets: Ticket[] = [];

    constructor() {
        super();
        let store = getStore();
        store.subscribe((state) => this.updateState(state))
    }

    updateState(state: Ticket[]) {
        this.tickets = state;
        this.requestUpdate();
    }

    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="style/style.css" />
        <section>
            <h2>Tickets</h2>
            <div class="tickets">
                <div class="ticket-header">Montant</div>
                <div class="ticket-header">Quantité</div>
                <span>&nbsp;</span>
                ${
                this.tickets.map((t, i) => {
                return html`
                <div class="ticket-row">${t.value.toString()}</div>
                <div class="ticket-row">${t.quantity.toString()}</div>
                <button class="ticket-row" @click="${(e) => this.onRemoveTicket(e, i)}">
                    <i class="fas fa-minus">-</i>
                </button>
                `;
                })
                }
            </div>
        </section>
        `;
    }

    onRemoveTicket(e: React.MouseEvent<HTMLButtonElement>, ticketIndex: number) {
        e.preventDefault();
        getStore().removeTicket(ticketIndex);
    }

}

