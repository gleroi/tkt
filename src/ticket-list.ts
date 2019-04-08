import { customElement, html, LitElement, property } from 'lit-element';
import { Ticket } from "./compute";

export interface RemoveTicketEvent extends CustomEvent {
    detail: {
        index: number;
    }
}

@customElement("tkt-ticket-list")
export class TicketList extends LitElement {

    @property({ type: Array, hasChanged: (newV, oldV) => true })
    tickets: Ticket[] = [];

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
        this.dispatchEvent(new CustomEvent("tkt-remove-ticket", {
            detail: {
                index: ticketIndex,
            }
        }));
    }

}

