import { customElement, html, LitElement } from 'lit-element';
import { getStore } from "./db";

@customElement("tkt-main")
export class Main extends LitElement {

    firstUpdated(changedProperties: Map<string | number | symbol, unknown>) {
        super.firstUpdated(changedProperties);
        let store = getStore();
        store.init();
        console.log("main", "connected!")
    }

    render() {
        return html`
        <h1 className="app-name">
            <img src="/tkt/img/icon192-inverse.png" className="app-logo" />
            <span>Tickets répartis</span>
        </h1>
        <tkt-ticket-list></tkt-ticket-list>
        <tkt-add-ticket></tkt-add-ticket>
        `;
    }
}