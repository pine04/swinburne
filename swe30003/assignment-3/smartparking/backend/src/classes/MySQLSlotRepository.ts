import { RowDataPacket } from "mysql2";
import SlotRepository from "../interfaces/SlotRepository";
import pool from "../services/mysql_pools";
import Slot from "./Slot";
import ParkingSession from "./ParkingSession";

export default class MySQLSlotRepository implements SlotRepository {
    private static _repository?: MySQLSlotRepository = undefined;

    private constructor() { }

    public static getRepository(): MySQLSlotRepository {
        if (!MySQLSlotRepository._repository) {
            MySQLSlotRepository._repository = new MySQLSlotRepository();
        }

        return MySQLSlotRepository._repository;
    }

    public async getSlots(): Promise<Slot[]> {
        try {
            const sql = "SELECT * FROM `Slot`";
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql);

            return queryResult.map(slot => new Slot(Number(slot["SlotNumber"]), slot["Type"]));
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async insertSlot(slot: Slot): Promise<boolean> {
        return true;
    }

    public async updateSlot(slot: Slot): Promise<boolean> {
        return true;
    }

    public async deleteSlot(slot: Slot): Promise<boolean> {
        return true;
    }

    public async getParkingSessionsForSlotBetween(slot: Slot, arrival: Date, departure: Date): Promise<ParkingSession[] | undefined> {
        try {
            const sql = "SELECT `Arrival`, `Departure` FROM `ParkingSession` WHERE `Arrival` <= ? AND `Departure` >= ? AND `SlotNumber` = ?";
            const values = [departure, arrival, slot.slotNumber];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            return queryResult.map(row => new ParkingSession({
                slot: slot,
                arrival: new Date(row["Arrival"]), 
                departure: new Date(row["Departure"])
            }));
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}