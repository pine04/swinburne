import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Driver from "./Driver"
import DriverRepository from "../interfaces/DriverRepository";
import pool from "../services/mysql_pools";

export default class MySQLDriverRepository implements DriverRepository {
    private static _repository?: MySQLDriverRepository = undefined;

    private constructor() { }

    public static getRepository(): MySQLDriverRepository {
        if (!MySQLDriverRepository._repository) {
            MySQLDriverRepository._repository = new MySQLDriverRepository();
        }

        return MySQLDriverRepository._repository;
    }

    async getDriverById(id: number) : Promise<Driver | undefined> {
        try {
            const sql = "SELECT * FROM `Driver` WHERE `ID` = ?";
            const values = [id];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            const driver = queryResult[0];
            if (driver) {
                return new Driver({
                    id: driver["ID"],
                    name: driver["Name"],
                    email: driver["Email"],
                    dob: driver["DOB"],
                    phone: driver["Phone"],
                    address: driver["Address"]
                });
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
 
    async createDriver(driver: Driver) : Promise<Driver | string> {
        if (driver.name === undefined || driver.email === undefined || driver.password === undefined || 
            driver.dob === undefined || driver.phone === undefined || driver.address === undefined) {
            return "Missing information";
        }

        try {
            const sql = "INSERT INTO `Driver` (`Name`, `Email`, `Password`, `DOB`, `Phone`, `Address`) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [driver.name, driver.email, driver.password, driver.dob, driver.phone, driver.address];
            const [queryResult, _] = await pool.execute<ResultSetHeader>(sql, values);

            return new Driver({
                id: queryResult.insertId,
                name: driver.name,
                email: driver.email,
                password: driver.password,
                dob: driver.dob,
                phone: driver.phone,
                address: driver.address
            });
        } catch (error) {
            console.log(error);
            return "An error happened.";
        }
    }

    async getDriverByCredentials(email: string, password: string): Promise<Driver | undefined> {
        try {
            const driver = await this.getDriverByEmail(email);

            if (driver && driver.password === password) {
                return driver;
            }

            return undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getDriverByEmail(email: String) : Promise<Driver | undefined> {
        try {
            const sql = "SELECT * FROM `Driver` WHERE `Email` = ?";
            const values = [email];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            const driver = queryResult[0];
            if (driver) {
                return new Driver({
                    id: driver["ID"],
                    name: driver["Name"],
                    email: driver["Email"],
                    password: driver["Password"],
                    dob: driver["DOB"],
                    phone: driver["Phone"],
                    address: driver["Address"]
                });
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}