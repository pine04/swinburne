import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import Admin from "./Admin";
import pool from "../services/mysql_pools";
import AdminRepository from "../interfaces/AdminRepository";

export default class MySQLAdminRepository implements AdminRepository {
    private static _repository?: MySQLAdminRepository = undefined

    private constructor() { }

    public static getRepository(): MySQLAdminRepository {
        if (!MySQLAdminRepository._repository) {
            MySQLAdminRepository._repository = new MySQLAdminRepository();
        }

        return MySQLAdminRepository._repository;
    }

    async createAdmin(admin: Admin) : Promise<Admin | string> {
        if (admin.name === undefined || admin.email === undefined || admin.password === undefined) {
            return "Missing information";
        }
        try {
            const sql = "INSERT INTO `Admin` (`Name`, `Email`, `Password`) VALUES (?, ?, ?)";
            const values = [admin.name, admin.email, admin.password];
            const [queryResult, _] = await pool.execute<ResultSetHeader>(sql, values);
            
            return new Admin({
                id: queryResult.insertId,
                name: admin.name,
                email: admin.email,
                password: admin.password
            });
        } catch (error) {
            console.log(error);
            return "An error happened.";
        }
    }

    async getAdminByEmail(email: string) : Promise<Admin | undefined> {
        try {
            const sql = "SELECT * FROM `Admin` WHERE `Email` = ?";
            const values = [email];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            const admin = queryResult[0];
            if (admin) {
                return new Admin({
                    id: admin["ID"],
                    name: admin["Name"],
                    email: admin["Email"],
                    password: admin["Password"]
                });
            } else {
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getAdminByCredentials(email: string, password: string): Promise<Admin | undefined> {
        try {
            const admin = await this.getAdminByEmail(email);

            if (admin && admin.password === password) {
                return admin;
            }

            return undefined;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async getAdminById(id: number): Promise<Admin | undefined> {
        try {
            const sql = "SELECT * FROM `Admin` WHERE `ID` = ?";
            const values = [id];
            const [queryResult, _] = await pool.execute<RowDataPacket[]>(sql, values);

            const driver = queryResult[0];
            if (driver) {
                return new Admin({
                    id: driver["ID"],
                    name: driver["Name"],
                    email: driver["Email"],
                    password: driver["Password"]
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