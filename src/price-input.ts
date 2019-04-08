import { customElement, html, LitElement, property } from "lit-element";

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
                <i className="fas fa-calculator">OK</i>
            </button>
        </section>
        `;
    }


    onPriceInput(e) {
        console.log("onpriceinput", e.currentTarget.valueAsNumber);
        this.value = e.currentTarget.valueAsNumber;
    }

    canCompute(value: number | undefined): unknown {
        console.log("cancompute", value ? true : false);
        return !value;
    }

    onCompute(e) {
        console.log("oncompute");
    }
}