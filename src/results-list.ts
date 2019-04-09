import { customElement, html, LitElement, property } from "lit-element";
import { priceOfResult, Result, Ticket } from "./compute";

@customElement("tkt-results-list")
export class ResultsList extends LitElement {

    @property({type: Array})
    tickets: Ticket[] = [];

    @property({type: Array})
    results: Result[] = [];

    @property({type: Number})
    price: number = 0;

    render() {
        return html`
        <link rel="stylesheet" type="text/css" href="style/style.css" />

        <section class="results">
                <h2>Résultats</h2>
                <div>
                    ${
                        this.results.map((r) => {
                            let diff = this.price - priceOfResult(r, this.tickets);
                            return html`
                            <div class="result">
                                ${
                                    r.map((qty, t) => (html`
                                        <div class="result-item">
                                            <div class="result-item-val">${this.tickets[t].value}</div>
                                            <div>${qty}</div>
                                        </div>`)
                                    ).concat(html`
                                        <div class="result-diff">
                                            <div>${diff.toFixed(2)}</div>
                                            <div class="result-diff-label">${diff > 0 ? "ajouté" : (diff < 0 ? "rendu" : "")}</div>
                                        </div>`
                                    )
                                }
                            </div>`
                        })
                    }
                </div>
        </section>
        `;
    }
    
}