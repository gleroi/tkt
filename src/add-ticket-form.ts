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
        <div class="tickets">
            <input class="ticket-row" type="number" .value="${this.new_value}" @input="${(e) => this.onNewValueChanged(e)}" />
            <input class="ticket-row" type="number" .value="${this.new_quantity}" @input="${(e) => this.onNewQuantityChanged(e)}" />
            <button class="ticket-row" key="new_add" ?disabled="${this.canAddTicket(this.new_value, this.new_quantity)}" @click="${(e) => this.onAddTicket(e)}">
                <i class="fas fa-plus">+</i>
            </button>
        </div>
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