import ParkingSession from "../classes/ParkingSession";
import Slot from "../classes/Slot";

export default interface SlotRepository {
    getSlots(): Promise<Slot[]>;
    insertSlot(slot: Slot): Promise<boolean>;
    updateSlot(slot: Slot): Promise<boolean>;
    deleteSlot(slot: Slot): Promise<boolean>;
    getParkingSessionsForSlotBetween(slot: Slot, arrival: Date, departure: Date): Promise<ParkingSession[] | undefined>;
}