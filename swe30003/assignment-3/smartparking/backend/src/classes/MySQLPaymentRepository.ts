import { ResultSetHeader, RowDataPacket } from "mysql2";
import PaymentRepository from "../interfaces/PaymentRepository";
import pool from "../services/mysql_pools";
import CashPayment from "./CashPayment";
import CreditPayment from "./CreditPayment";
import OnlineBankingPayment from "./OnlineBankingPayment";
import Payment from "./Payment";
import Slot from "./Slot";
import ParkingSession from "./ParkingSession";

export default class MySQLPaymentRepository implements PaymentRepository {
    private static _repository?: MySQLPaymentRepository = undefined;

    private constructor() { }

    public static getRepository(): MySQLPaymentRepository {
        if (!MySQLPaymentRepository._repository) {
            MySQLPaymentRepository._repository = new MySQLPaymentRepository();
        }

        return MySQLPaymentRepository._repository;
    }

    public async insertPayment(payment: Payment): Promise<number | undefined> {
        try {
            let sql = "INSERT INTO `Payment` (`ParkingSessionID`, `TimeOfPayment`,";
            let values: any[] = [payment.session.id!, payment.timeOfPayment];

            if (payment instanceof CashPayment) {
                sql += "`CashPaid`, `CashChange`) VALUES (?, ?, ?, ?)";
                values.push(payment.amountPaid, payment.change);
            } else if (payment instanceof CreditPayment) {
                sql += "`CardName`, `CardNumber`) VALUES (?, ?, ?, ?)";
                values.push(payment.cardName, payment.cardNumber);
            } else if (payment instanceof OnlineBankingPayment) {
                sql += "`BankName`, `AccountNumber`) VALUES (?, ?, ?, ?)";
                values.push(payment.bankName, payment.accountNumber);
            } else {
                return undefined;
            }

            await pool.execute<ResultSetHeader>(sql, values);
            return payment.session.id;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async getPayments(startDate: Date, endDate: Date, slots: Slot[]): Promise<Payment[] | undefined> {
        return undefined;
    }

    public async getPaymentsByDriverId(driverId: number): Promise<Payment[] | undefined> {
        try {
            const sql = "SELECT * FROM `Payment` JOIN `ParkingSession` ON `Payment`.`ParkingSessionID` = `ParkingSession`.`ID` JOIN `Slot` ON `ParkingSession`.`SlotNumber` = `Slot`.`SlotNumber` WHERE `DriverID` = ?";
            const values = [driverId];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            return queryResult.map(row => {
                const session = new ParkingSession({
                    slot: new Slot(row["SlotNumber"], row["SlotType"]),
                    arrival: new Date(row["Arrival"]),
                    departure: new Date(row["Departure"]),
                    id: row["ID"]
                });

                let payment: Payment;

                if (row["CardName"] !== null) {
                    payment = new CreditPayment(session, new Date(row["TimeOfPayment"]), row["CardName"], row["CardNumber"]);
                } else if (row["BankName"] !== null) {
                    payment = new OnlineBankingPayment(session, new Date(row["TimeOfPayment"]), row["BankName"], row["AccountNumber"]);
                } else {
                    payment = new CreditPayment(session, new Date(), "", "");
                }

                return payment;
            });
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}