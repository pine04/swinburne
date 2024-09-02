import Main from "./Main";
import Driver from "./Driver";
import Slot from "./Slot";

export default class ParkingSession {
    private static hourlyRate = {
        "motorcycle": 5000,
        "car": 15000
    };

    private _id?: number;
    private _slot: Slot;
    private _arrival: Date;
    private _departure: Date;
    private _driver?: Driver;

    constructor(params: { slot: Slot, arrival: Date, departure: Date, driver?: Driver, id?: number }) {
        this._slot = params.slot;
        this._arrival = params.arrival;
        this._departure = params.departure;
        this._driver = params.driver;
        this._id = params.id;
    }

    public async recordSession(): Promise<boolean> {
        const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
        const result = await parkingSessionRepository.insertParkingSession(this);
        if (result) {
            this._id = result;
            return true;
        } else {
            return false;
        }
    }

    public calculateCost(): number {
        const rate = ParkingSession.hourlyRate[this.slot.type];
        const hours = (this.departure.getTime() - this.arrival.getTime()) / 1000 / 3600;
        return rate * hours;
    }

    public async cancel(): Promise<boolean> {
        return false;
    }

    get id() {
        return this._id;
    }

    get slot() {
        return this._slot;
    }

    get arrival() {
        return this._arrival;
    }

    get departure() {
        return this._departure;
    }

    get driver() {
        return this._driver;
    }
}