import Driver from "../classes/Driver";

export default interface DriverRepository {
    createDriver(driver: Driver): Promise<Driver | string>;
    getDriverByCredentials(email: string, password: string): Promise<Driver | undefined>;
    getDriverByEmail(email: string): Promise<Driver | undefined>;
    getDriverById(id: number): Promise<Driver | undefined>;
}