import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pinetar@2004",
    database: "SmartParking"
});

export default pool;