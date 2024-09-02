import ParkingSession from "../classes/ParkingSession";
import Slot from "../classes/Slot";

export default interface ParkingSessionRepository {
    insertParkingSession(session: ParkingSession): Promise<number | undefined>;
    getParkingSessionById(id: number): Promise<ParkingSession | undefined>;
    getWalkInSessionById(id: number): Promise<ParkingSession | undefined>;
    getParkingSessions(startDate: Date, endDate: Date, slots: Slot[]): Promise<ParkingSession[] | undefined>;
    getBookings(driverId: number): Promise<ParkingSession[] | undefined>;
    getUnpaidWalkInSessions(): Promise<ParkingSession[] | undefined>;
}