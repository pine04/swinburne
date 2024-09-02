import Payment from "./Payment";
import ParkingSession from "./ParkingSession";

export default abstract class OnlinePayment extends Payment {
    constructor(session: ParkingSession, timeOfPayment: Date) {
        super(session, timeOfPayment);
    }

    public abstract withdraw(): OnlinePaymentResult;
}

export type OnlinePaymentResult = {
    success: boolean,
    message: String
}