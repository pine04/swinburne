import Main from "./Main";
import ParkingSession from "./ParkingSession";

export default abstract class Payment {
    protected _session: ParkingSession;
    private _timeOfPayment: Date;

    constructor(session: ParkingSession, timeOfPayment: Date) {
        this._session = session;
        this._timeOfPayment = timeOfPayment;
    }

    public async recordPayment(): Promise<boolean> {
        const paymentRepository = Main.getInstance().getPaymentRepository();
        const result = await paymentRepository.insertPayment(this);
        return result !== undefined;
    }

    get session() {
        return this._session;
    }

    get timeOfPayment() {
        return this._timeOfPayment;
    }
}