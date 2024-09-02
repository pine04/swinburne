import { ResultSetHeader, RowDataPacket } from "mysql2";
import ParkingSessionRepository from "../interfaces/ParkingSessionRepository";
import pool from "../services/mysql_pools";
import ParkingSession from "./ParkingSession";
import Slot from "./Slot";

export default class MySQLParkingSessionRepository implements ParkingSessionRepository {
    private static _repository?: MySQLParkingSessionRepository = undefined;

    private constructor() { }

    public static getRepository(): MySQLParkingSessionRepository {
        if (!MySQLParkingSessionRepository._repository) {
            MySQLParkingSessionRepository._repository = new MySQLParkingSessionRepository();
        }

        return MySQLParkingSessionRepository._repository;
    }

    public async insertParkingSession(session: ParkingSession): Promise<number | undefined> {
        try {
            const sql = "INSERT INTO `ParkingSession` (`DriverID`, `SlotNumber`, `Arrival`, `Departure`) VALUES (?, ?, ?, ?)";
            const values = [session.driver?.id || null, session.slot.slotNumber, session.arrival, session.departure];
            const [queryResult, _] = await pool.execute<ResultSetHeader>(sql, values);
            return queryResult.insertId;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async getWalkInSessionById(id: number): Promise<ParkingSession | undefined> {
        try {
            const sql = "SELECT * FROM `ParkingSession` JOIN `Slot` ON `ParkingSession`.`SlotNumber` = `Slot`.`SlotNumber` WHERE `ID` = ? AND `DriverID` IS NULL";
            const values = [id];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);
            
            if (queryResult.length === 0) {
                return undefined;
            }

            const row = queryResult[0];
            return new ParkingSession({
                slot: new Slot(+row["SlotNumber"], row["Type"]),
                arrival: new Date(row["Arrival"]),
                departure: new Date(row["Departure"]),
                id: row["ID"]
            })
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async getParkingSessions(startDate: Date, endDate: Date, slots: Slot[] = []): Promise<ParkingSession[] | undefined> {
        try {
            let sql = "SELECT * FROM `ParkingSession` JOIN `Slot` ON `ParkingSession`.`SlotNumber` = `Slot`.`SlotNumber` WHERE `Arrival` <= ? AND `Departure` >= ?";
            const slotNumberConditions = Array(slots.length).fill("`ParkingSession`.`SlotNumber` = ?").join(" OR ");
            if (slotNumberConditions) sql += " AND " + slotNumberConditions;

            
            const slotNumbers = slots.map(slot => slot.slotNumber);
            const values = [endDate, startDate, ...slotNumbers];
            
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            return queryResult.map(row => new ParkingSession({
                slot: new Slot(+row["SlotNumber"], row["Type"]),
                arrival: new Date(row["Arrival"]), 
                departure: new Date(row["Departure"]),
                id: row["ID"]
            }));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async getParkingSessionById(id: number): Promise<ParkingSession | undefined> {
        try {
            const sql = "SELECT * FROM `ParkingSession` JOIN `Slot` ON `ParkingSession`.`SlotNumber` = `Slot`.`SlotNumber` WHERE `ID` = ?";
            const values = [id];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);
            
            if (queryResult.length === 0) {
                return undefined;
            } else {
                const row = queryResult[0];
                return new ParkingSession({
                    slot: new Slot(+row["SlotNumber"], row["Type"]),
                    arrival: new Date(row["Arrival"]),
                    departure: new Date(row["Departure"]),
                    id: row["ID"]
                });
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async getBookings(driverId: number): Promise<ParkingSession[] | undefined> {
        try {
            const sql = "SELECT * FROM `ParkingSession` JOIN `Slot` ON `ParkingSession`.`SlotNumber` = `Slot`.`SlotNumber` WHERE `DriverID` = ?";
            const values = [driverId];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);
            
            return queryResult.map(row => new ParkingSession({
                slot: new Slot(+row["SlotNumber"], row["Type"]),
                arrival: new Date(row["Arrival"]),
                departure: new Date(row["Departure"]),
                id: row["ID"]
            }));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    public async getUnpaidWalkInSessions(): Promise<ParkingSession[] | undefined> {
        try {
            const sql = "SELECT * FROM `ParkingSession` LEFT JOIN `Payment` ON `ParkingSession`.`ID` = `Payment`.`ParkingSessionID` JOIN `Slot` ON `ParkingSession`.`SlotNumber` = `Slot`.`SlotNumber` WHERE `DriverID` IS NULL AND `TimeOfPayment` IS NULL";
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql);
            
            return queryResult.map(row => new ParkingSession({
                slot: new Slot(+row["SlotNumber"], row["Type"]),
                arrival: new Date(row["Arrival"]),
                departure: new Date(row["Departure"]),
                id: row["ID"]
            }));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}