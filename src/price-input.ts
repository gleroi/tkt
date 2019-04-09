import { customElement, html, LitElement, property } from "lit-element";

export interface SubmitPriceEvent {
    detail: {
        price: number;
    }
}

@customElement("tkt-price-input")
export class PriceInput extends LitElement {

    @property({ type: Number })
    value?: number = undefined;

    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="style/style.css" />
        <section>
            <h2>Prix</h2>
            <input type="number" .value=${this.value} @input=${this.onPriceInput} />
            <button @click=${this.onCompute} ?disabled=${this.canCompute(this.value)}>
                <i class="fas fa-calculator">OK</i>
            </button>
        </section>
        `;
    }

    onPriceInput(e: Event) {
        this.value = e.target ? e.target.valueAsNumber : null;
    }

    canCompute(value: number | undefined): unknown {
        return !value;
    }

    onCompute(e: Event) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent("tkt-submit-price", {
            bubbles: true, composed: true,
            detail: { price: this.value },
        }));
    }
}