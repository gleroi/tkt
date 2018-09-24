import * as React from "react";

interface Ticket {
    value?: number;
    quantity?: number;
}

interface MainState {
    price?: number;
    tickets: Ticket[];
    new: Ticket;
}

export class Main extends React.Component<any, MainState> {
    constructor(props: any, context: any) {
        super(props, context)
        this.state = {
            tickets: [],
            new: {}
        }
    }

    render() {
        return (<div>
            <h1>Tickets répartis</h1>
            <section>
                <h4>Prix</h4>
                <input type="text" value={this.state.price} onChange={(e) => this.onPriceChanged(e)} />
                <button>=</button>
            </section>
            <section>
                <h4>Tickets</h4>
                <div className="tickets">
                    <div>Tickets</div>
                    <div>Quantité</div>
                    <div>&nbsp;</div>
                    {
                        this.state.tickets.map(t => {
                            return (
                                <>
                                    <input type="text" value={t.value} />
                                    <input type="text" value={t.quantity} />
                                    <div>&nbsp;</div>
                                </>)
                        })
                    }
                    <input type="text" value={this.state.new.value} onChange={(e) => this.onNewValueChanged(e)} />
                    <input type="text" value={this.state.new.quantity} onChange={(e) => this.onNewQuantityChanged(e)} />
                    <button disabled={this.canAddTicket(this.state.new)} onClick={(e) => this.onAddTicket(e)}>+</button>
                </div>
            </section>
            <section>
                <h4>Résultats</h4>

            </section>
        </div>);
    }

    onAddTicket(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let tickets = this.state.tickets.concat([
            { value: this.state.new.value, quantity: this.state.new.quantity}
        ]);
        let newTicket : Ticket = {};
        this.setState({
            new: newTicket,
            tickets: tickets
        });
    }

    canAddTicket(t : Ticket) {
        return !(t.quantity && t.value)
    }

    onPriceChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState({
            price: convert(e.currentTarget.value)
        });
    }

    onNewValueChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState({
            new: {
                value:convert(e.currentTarget.value),
                quantity: this.state.new.quantity
            }
        });
    }

    onNewQuantityChanged(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        this.setState({
            new: {
                value:this.state.new.value,
                quantity:convert(e.currentTarget.value)
            }
        });
    }
}

function convert(val: string): number|undefined {
    try {
        let price: number|null = null;
        if (!(val == null || val.length == 0)) {
            price = parseFloat(val);
        }
        return price ? price : undefined;
    } catch (err) {
        return undefined;
    }
}