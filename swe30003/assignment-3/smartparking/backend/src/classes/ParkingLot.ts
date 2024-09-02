import ParkingSession from "./ParkingSession";
import Slot, { SlotType } from "./Slot";
import Payment from "./Payment";
import Main from "./Main";

export default class ParkingLot {
    private static _instance?: ParkingLot = undefined;
    private _slots: Slot[];

    private constructor() {
        this._slots = [];
    }

    public static async getParkingLot() {
        if (!ParkingLot._instance) {
            const slotRepository = Main.getInstance().getSlotRepository();

            ParkingLot._instance = new ParkingLot();
            ParkingLot._instance._slots = await slotRepository.getSlots();
        }
        return ParkingLot._instance;
    }

    public async allocateWalkInSession(type: SlotType, arrival: Date, departure: Date): Promise<ParkingSession | undefined> {
        let emptySlot = undefined;

        for (const slot of this._slots) {
            const available = await slot.isAvailable(arrival, departure);

            if (available && slot.type === type) {
                emptySlot = slot;
                break;
            }
        }

        if (!emptySlot) {
            return undefined;
        }

        const session = new ParkingSession({
            slot: emptySlot, 
            arrival: arrival,
            departure: departure
        });
        session.recordSession();
        return session;
    }

    public recordWalkInPayment(session: ParkingSession, payment: Payment): boolean {
        return true;
    }

    public getSlot(slotNumber: number): Slot | undefined {
        return this._slots.find((slot) => slot.slotNumber === slotNumber);
    }

    public getSlots(slotNumbers: number[]): Slot[] {
        return this._slots.filter(slot => slotNumbers.includes(slot.slotNumber));
    }

    get slots() {
        return this._slots;
    }
}