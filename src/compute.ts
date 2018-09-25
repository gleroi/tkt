export interface Ticket {
    value: number;
    quantity: number;
}

export type Result = number[];

const MaxReturnedMoney = 3;

export function compute(price: number, tickets: Ticket[]) : Result[] {
    let results : Result[] = [];

    let result = new Array(tickets.length).fill(0)
    while (true) {
        let done = nextResult(result, tickets);
        if (done) {
            break;
        }
        let diff = price - priceOfResult(result, tickets);
        if (diff >= -MaxReturnedMoney) {
            results.push(result.slice(0));
        }
    }
    results.sort((r1, r2) => Math.abs(price - priceOfResult(r1, tickets)) - Math.abs(price - priceOfResult(r2, tickets)));
    return results;
}

function nextResult(r: Result, tickets: Ticket[]) {
    for (let t = 0; t < tickets.length; t++) {
        let max = tickets[t].quantity;
        if (r[t] + 1 > max) {
            r[t] = 0;
            continue;
        } else {
            r[t] += 1
            return false;
        }
    }
    return true;
}

export function priceOfResult(r: Result, tickets: Ticket[]) : number {
    let price = 0;
    for (let t = 0; t < tickets.length; t++) {
        price += tickets[t].value * r[t];
    }
    return price;
}
