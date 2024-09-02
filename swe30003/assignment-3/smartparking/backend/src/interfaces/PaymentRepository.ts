import Payment from "../classes/Payment";
import Slot from "../classes/Slot";

export default interface PaymentRepository {
    insertPayment(payment: Payment): Promise<number | undefined>;
    getPayments(startDate: Date, endDate: Date, slots: Slot[]): Promise<Payment[] | undefined>;
    getPaymentsByDriverId(driverId: number): Promise<Payment[] | undefined>;
}