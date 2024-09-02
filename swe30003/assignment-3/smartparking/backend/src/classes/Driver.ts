import User from "./User";
import Main from "./Main";

type DriverParams = {
    id?: number,
    name?: string,
    email?: string,
    password?: string,
    dob?: Date,
    phone?: string,
    address?: string
}

export default class Driver extends User {
    private _dob?: Date;
    private _phone?: string;
    private _address?: string;

    constructor(params: DriverParams) {
        super({ id: params.id, name: params.name, email: params.email, password: params.password });

        this._dob = params.dob;
        this._phone = params.phone;
        this._address = params.address;
    }

    async signup(): Promise<Driver | string> {
        if (this.email === undefined) {
            return "Email missing.";
        }

        const repository = Main.getInstance().getDriverRepository();
        const driver = await repository.getDriverByEmail(this.email);
        if (driver) {
            return "Email has already been used";
        }
        const result = await repository.createDriver(this);
        return result;
    }

    async signin(): Promise<Driver | string> {
        if (this.email === undefined || this.password === undefined) {
            return "Email or password missing.";
        }

        const repository = Main.getInstance().getDriverRepository();
        const driver = await repository.getDriverByCredentials(this.email, this.password);
        if (driver) {
            return driver;
        } else {
            return "Email or password is not correct.";
        }
    }

    get dob() {
        return this._dob;
    }

    get phone() {
        return this._phone;
    }

    get address() {
        return this._address;
    }
}