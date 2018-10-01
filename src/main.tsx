import * as React from "react";
import { Ticket, Result, priceOfResult, compute } from "./compute";

interface MainState {
    price: string;
    tickets: Ticket[];
    new_value: string;
    new_quantity: string;
    compute_price: number;
    results: Result[];
}

export class Main extends React.Component<any, MainState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            price: "",
            tickets: [],
            new_value: "",
            new_quantity: "",
            compute_price: 0,
            results: [],
        }
    }

    componentDidMount() {
        this.setState({
            tickets: loadDB()
        });
    }

    render() {
        return (<div>
            <h1 className="app-name">Tickets répartis</h1>
            <section>
                <h2>Prix</h2>
                <input type="number" value={this.state.price} onChange={(e) => this.onPriceChanged(e)} />
                <button disabled={this.canCompute(this.state.price)} onClick={(e) => this.onCompute(e)}>
                    <i className="fas fa-calculator"></i>
                </button>
            </section>
            <section>
                <h2>Tickets</h2>
                <div className="tickets">
                    <div className="ticket-header">Montant</div>
                    <div className="ticket-header">Quantité</div>
                    <span>&nbsp;</span>
                    {
                        this.state.tickets.map((t, i) => {
                            return (<>
                                <div className="ticket-row" key={"ticketval" + i}>{t.value.toString()}</div>
                                <div className="ticket-row" key={"ticketqty" + i}>{t.quantity.toString()}</div>
                                <button className="ticket-row" key={"ticketadd" + i} onClick={(e) => this.onRemoveTicket(e, i)}>
                                    <i className="fas fa-minus"></i>
                                </button>
                            </>)
                        })
                    }
                    <input key="new_value" type="number" className="ticket-row" value={this.state.new_value} onChange={(e) => this.onNewValueChanged(e)} />
                    <input key="new_quantity" type="number" className="ticket-row" value={this.state.new_quantity} onChange={(e) => this.onNewQuantityChanged(e)} />
                    <button className="ticket-row" key="new_add" disabled={this.canAddTicket(this.state.new_value, this.state.new_quantity)} onClick={(e) => this.onAddTicket(e)}>
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </section>
            <section className="results">
                <h2>Résultats</h2>
                <div>
                    {
                        this.state.results.map((r, ri) => {
                            let diff = this.state.compute_price - priceOfResult(r, this.state.tickets);
                            return (<div className="result">{
                                r.map((qty, t) => (
                                    <div key={`result-${ri}-${t}`} className="result-item">
                                        <div className="result-item-val">{this.state.tickets[t].value}</div>
                                        <div>{qty}</div>
                                    </div>
                                )).concat(<div key={`price-${ri}`} className="result-diff">
                                    <div>{diff.toFixed(2)}</div>
                                    <div className="result-diff-label">{diff > 0 ? "ajouté" : (diff < 0 ? "rendu" : "")}</div>
                                </div>)
                            }</div>
                        )})
                    }
                </div>
            </section>
        </div>);
    }

    onCompute(e: React.MouseEvent<HTMLButtonElement>) {
        let price = convert(this.state.price);
        if (price == null) {
            return;
        }
        let results = compute(price, this.state.tickets);
        this.setState({
            compute_price: price,
            results: results
        });
    }

    canCompute(sprice: string) {
        let price = convert(sprice);
        return !price
    }
    
    onPriceChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState({
            price: e.currentTarget.value
        });
    }

    onAddTicket(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let val = convert(this.state.new_value);
        let qty = convert(this.state.new_quantity);
        if (val == null || qty == null) {
            return;
        }
        let tickets = this.state.tickets.concat([
            { value: val, quantity: qty }
        ]);
        saveDB(tickets);
        this.setState({
            new_value: "",
            new_quantity: "",
            tickets: tickets
        });
    }

    canAddTicket(sval: string, sqty: string) {
        let val = convert(sval);
        let qty = convert(sqty);
        return !(qty && val);
    }

    onRemoveTicket(e: React.MouseEvent<HTMLButtonElement>, ticketIndex: number) {
        e.preventDefault();
        let tickets = this.state.tickets.slice(0);
        tickets.splice(ticketIndex, 1);
        saveDB(tickets);
        this.setState({
            tickets: tickets
        });
    }

    onNewValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState({
            new_value: e.currentTarget.value,
        });
    }

    onNewQuantityChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState({
            new_quantity: e.currentTarget.value
        });
    }
}

function loadDB(): Ticket[] {
    let str = window.localStorage.getItem("tkt_tickets");
    if (str == null) {
        return [];
    }
    return JSON.parse(str);
}

function saveDB(tickets: Ticket[]) {
    window.localStorage.setItem("tkt_tickets", JSON.stringify(tickets));
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