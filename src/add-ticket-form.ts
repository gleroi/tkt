import { customElement, html, LitElement, property } from 'lit-element';
import { getStore } from "./db";

@customElement("tkt-add-ticket")
export class AddTicketForm extends LitElement {

    @property({ type: String })
    new_value: string = "";

    @property({ type: String })
    new_quantity: string = "";

    render() {
        return html`
        <input id="new_value" type="number" .value="${this.new_value}" @input="${(e) => this.onNewValueChanged(e)}" />
        <input id="new_quantity" type="number" .value="${this.new_quantity}" @input="${(e) => this.onNewQuantityChanged(e)}" />
        <button className="ticket-row" key="new_add" ?disabled="${this.canAddTicket(this.new_value, this.new_quantity)}" @click="${(e) => this.onAddTicket(e)}">
            <i className="fas fa-plus">++</i>
        </button>
        `;
    }

    canAddTicket(sval: string, sqty: string) {
        let val = convert(sval);
        let qty = convert(sqty);
        return !(qty && val);
    }

    onAddTicket(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let val = convert(this.new_value);
        let qty = convert(this.new_quantity);
        if (val == null || qty == null) {
            return;
        }
        getStore().addTicket(val, qty);
        this.new_value = "";
        this.new_quantity = "";
    }

    onNewValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.new_value = e.currentTarget.value;
    }

    onNewQuantityChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.new_quantity = e.currentTarget.value;
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