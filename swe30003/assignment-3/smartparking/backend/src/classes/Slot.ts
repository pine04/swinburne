import Main from "./Main";
import ParkingSession from "./ParkingSession";
import Driver from "./Driver";

export type SlotType = "motorcycle" | "car";

export default class Slot {
    private static directions = [
        "Enter and go straight, then turn right at the first column. Look for a spot near the wall.",
        "Drive to the second level and turn left. Find a spot by the column with the number 12.",
        "Head straight and turn left at the third sign. The spots are on your right.",
        "Enter and take the second right. Look for open spots near the column marked 'A.'",
        "Go down to the bottom level and turn left. Spots are near the end of the row.",
        "Follow the arrows to the left and find a spot near the column with the letter 'B.'",
        "Take the first right after entering. Look for spaces around column number 8.",
        "Go straight, then turn left at the next sign. Check for spots close to column 5.",
        "Drive to the far end of the lot and park near the last column on the right.",
        "Turn right after entering and follow the signs to 'Visitor Parking.' Look for spots near the green column."
    ];

    private _slotNumber: number;
    private _type: SlotType;

    constructor(slotNumber: number, type: SlotType) {
        this._slotNumber = slotNumber;
        this._type = type;
    }

    public async createBooking(driver: Driver, arrival: Date, departure: Date): Promise<ParkingSession | undefined> {
        const available = await this.isAvailable(arrival, departure);

        if (available) {
            const session = new ParkingSession({
                slot: this,
                arrival: arrival,
                departure: departure,
                driver: driver
            });
            await session.recordSession();
            return session;
        } else {
            return undefined;
        }
    }

    public async isAvailable(arrival: Date, departure: Date): Promise<boolean> {
        const slotRepository = Main.getInstance().getSlotRepository();
        const sessions = await slotRepository.getParkingSessionsForSlotBetween(this, arrival, departure);
        return sessions !== undefined && sessions.length === 0;
    }

    public getDirections(): string {
        const randomIndex = Math.round(Math.random() * (Slot.directions.length - 1));
        return Slot.directions[randomIndex];
    }

    get slotNumber() {
        return this._slotNumber;
    }

    get type() {
        return this._type;
    }
}