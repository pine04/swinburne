import ParkingSession from "./ParkingSession";
import Payment from "./Payment";

export default class CashPayment extends Payment {
    private _amountPaid: number;
    private _change: number;

    constructor(session: ParkingSession, timeOfPayment: Date, amountPaid: number) {
        super(session, timeOfPayment);

        this._amountPaid = amountPaid;
        this._change = amountPaid - session.calculateCost();
    }

    get amountPaid() {
        return this._amountPaid;
    }

    get change() {
        return this._change;
    }
}