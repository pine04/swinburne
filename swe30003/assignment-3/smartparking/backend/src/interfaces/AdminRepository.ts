import Admin from "../classes/Admin";

export default interface AdminRepository {
    createAdmin(admin: Admin): Promise<Admin | string>;
    getAdminByEmail(email: string): Promise<Admin | undefined>;
    getAdminByCredentials(email: string, password: string): Promise<Admin | undefined>;
    getAdminById(id: number): Promise<Admin | undefined>;
}