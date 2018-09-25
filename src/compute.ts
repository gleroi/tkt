export interface Ticket {
    value: number;
    quantity: number;
}

export type Result = number[];

const MaxReturnedMoney = 3;

export function compute(price: number, tickets: Ticket[]) : Result[] {
    let results : Result[] = [];

    let result = new Array(tickets.length).fill(0)
    for (let t = 0; t < tickets.length; t++) {
        let ticket = tickets[t];
        for (let q = 0; q < ticket.quantity; q++) {
            result[t] += 1;
            let diff = price - priceOfResult(result, tickets);
            if (diff < -MaxReturnedMoney) {
                result.fill(0, t)
                break;
            } else {
                results.push(result.slice(0));
            }
        }
    }
    results.sort((r1, r2) => (priceOfResult(r2, tickets) - priceOfResult(r1, tickets)));
    return results;
}

export function priceOfResult(r: Result, tickets: Ticket[]) : number {
    let price = 0;
    for (let t = 0; t < tickets.length; t++) {
        price += tickets[t].value * r[t];
    }
    return price;
}

function arrayEqual(a: number[], b: number[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

function test() {
    testSimple1(7.66, [{value: 7.66, quantity : 10}, {value: 8.10, quantity : 10}]);
    testSimple1(8.10, [{value: 7.66, quantity : 10}, {value: 8.10, quantity : 10}]);
    testSimple2(7.66*10, [{value: 7.66, quantity : 10}]);
}

function testSimple2(price: number, tickets: Ticket[]) {
    let results = compute(price, tickets);
    console.assert(results.length == 10, "testSimple2:", "expected", 10, "got", results.length);
    for (let i = 0; i < results.length; i++) {
        console.assert(arrayEqual(results[i], [i+1]), "testSimple2:", "expected", [i+1], "got", results[i]);
    }
}

function testSimple1(price: number, tickets: Ticket[]) {
    let results = compute(price, tickets);
    console.assert(results.length == 2, "testSimple1:", "expected length", 2, "got", results.length);
    console.assert(arrayEqual(results[0], [1, 0]), "testSimple1:", "expected", [1, 0], "got", results[0]);
    console.assert(arrayEqual(results[1], [0, 1]), "testSimple1:", "expected", [0, 1], "got", results[0]);
}

test();