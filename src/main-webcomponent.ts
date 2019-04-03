import { customElement, html, LitElement } from 'lit-element';

@customElement("tkt-main")
export class Main extends LitElement {
    render() {
        return html`
        <h1 className="app-name">
            <img src="/tkt/img/icon192-inverse.png" className="app-logo" />
            <span>Tickets répartis</span>
        </h1>
        <tkt-ticket-list></tkt-ticket-list>
        `;
    }
}