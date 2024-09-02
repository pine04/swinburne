import OnlinePayment, { OnlinePaymentResult } from "./OnlinePayment";
import ParkingSession from "./ParkingSession";

export default class OnlineBankingPayment extends OnlinePayment {
    private _bankName: String;
    private _accountNumber: String;

    constructor(session: ParkingSession, timeOfPayment: Date, bankName: String, accountNumber: String) {
        super(session, timeOfPayment);

        this._bankName = bankName;
        this._accountNumber = accountNumber;
    }

    public override withdraw(): OnlinePaymentResult {
        const cost = this._session.calculateCost();

        return {
            success: true,
            message: `Withdrawn ${cost} from bank account ${this._accountNumber} of bank ${this._bankName}.`
        };
    }

    get bankName() {
        return this._bankName;
    }

    get accountNumber() {
        return this._accountNumber;
    }
}
