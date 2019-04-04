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
        <style>
        :host([hidden]) {
            display: none;
        }
        :host {
            display: block;
        }
        .tickets {
            display: grid;
            grid-template-columns: 0.5fr 0.5fr 3em;
            grid-auto-flow: row;
            width: 100%;
        }
        .tickets > div.ticket-row {
            font-size: 1em;
            border-style: none;
            margin: 3px;
            padding: 0.5em 0.3em 0.2em 0.3em;
            border-bottom: 1px solid #666;
        }
        .tickets > button.ticket-row {
            padding: 0.5em 0.3em;
            border-style: none;
            margin: 2px 0;
        }
        .tickets input {
            width:100%;
            margin-right: 1px;
        }
        .tickets > .ticket-header {
            font-weight: bold;
        }
        </style>
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

