import { customElement, html, LitElement, property } from 'lit-element';
import { Ticket } from "./compute";
import { loadDB, saveDB } from "./db";

@customElement("tkt-ticket-list")
export class TicketList extends LitElement {

    @property({type: Array})
    tickets : Ticket[] = [];

    @property({type: String})
    new_value:string = "";

    @property({type: String})
    new_quantity:string = "";

    connectedCallback() {
        super.connectedCallback();
        this.tickets = loadDB();
    }

    render() {
        return html`
            <section>
                <h2>Tickets</h2>
                <div className="tickets">
                    <div className="ticket-header">Montant</div>
                    <div className="ticket-header">Quantité</div>
                    <span>&nbsp;</span>
                    ${
                        this.tickets.map((t, i) => {
                            return html`
                                <div className="ticket-row">${t.value.toString()}</div>
                                <div className="ticket-row">${t.quantity.toString()}</div>
                                <button className="ticket-row" @click="${(e) => this.onRemoveTicket(e, i)}">
                                    <i className="fas fa-minus">-</i>
                                </button>
                            `;
                        })
                    }
                    <input id="new_value" type="number" .value="${this.new_value}" 
                        @input="${(e) => this.onNewValueChanged(e)}" />
                    <input id="new_quantity" type="number" .value="${this.new_quantity}" 
                        @input="${(e) => this.onNewQuantityChanged(e)}" />
                    <button className="ticket-row" key="new_add" 
                        ?disabled="${this.canAddTicket(this.new_value, this.new_quantity)}"
                        @click="${(e)=> this.onAddTicket(e)}">
                        <i className="fas fa-plus">+</i>
                    </button>
                </div>
            </section>
        `;
    }

    canAddTicket(sval: string, sqty: string) {
        let val = convert(sval);
        let qty = convert(sqty);
        this.requestUpdate("disabled")
        return !(qty && val);
    }

    
    onAddTicket(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let val = convert(this.new_value);
        let qty = convert(this.new_quantity);
        if (val == null || qty == null) {
            return;
        }
        let tickets = this.tickets.concat([
            { value: val, quantity: qty }
        ]);
        saveDB(tickets);
        this.new_value =  "";
        this.new_quantity =  "";
        this.tickets = tickets;
        console.log("add!")
    }
    
    onRemoveTicket(e: React.MouseEvent<HTMLButtonElement>, ticketIndex: number) {
        e.preventDefault();
        let tickets = this.tickets.slice(0);
        tickets.splice(ticketIndex, 1);
        saveDB(tickets);
        this.tickets = tickets;
    }
        
    onNewValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.new_value = e.currentTarget.value;
        console.log("new_value", this.new_value, e.currentTarget);
    }

    onNewQuantityChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.new_quantity = e.currentTarget.value;
        console.log("new_quantity", this.new_quantity, e.currentTarget);
    }
}


function convert(val: string): number | undefined {
    try {
        let price: number | null = null;
        if (!(val == null || val.length == 0)) {
            price = parseFloat(val);
        }
        return price ? price : undefined;
    } catch (err) {
        return undefined;
    }
}