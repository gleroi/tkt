import { customElement, html, LitElement, property } from 'lit-element';

export interface AddTicketEvent extends CustomEvent {
    detail: {
        value: number;
        quantity: number;
    }
}

@customElement("tkt-add-ticket")
export class AddTicketForm extends LitElement {

    @property({ type: String })
    new_value: string = "";

    @property({ type: String })
    new_quantity: string = "";


    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="style/style.css" />
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
        this.dispatchEvent(new CustomEvent("tkt-add-ticket", {
            bubbles: true, composed: true,
            detail: { value: val, quantity: qty },
        }));
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