import OnlinePayment, { OnlinePaymentResult } from "./OnlinePayment";
import ParkingSession from "./ParkingSession";

export default class CreditPayment extends OnlinePayment {
    private _cardName: String;
    private _cardNumber: String;

    constructor(session: ParkingSession, timeOfPayment: Date, cardName: String, cardNumber: String) {
        super(session, timeOfPayment);

        this._cardName = cardName;
        this._cardNumber = cardNumber;
    }

    public override withdraw(): OnlinePaymentResult {
        const cost = this._session.calculateCost();
        
        return {
            success: true,
            message: `Withdrawn ${cost} from credit card ${this._cardName} with number ${this._cardNumber}.`
        };
    }
    
    get cardName() {
        return this._cardName;
    }

    get cardNumber() {
        return this._cardNumber;
    }
}