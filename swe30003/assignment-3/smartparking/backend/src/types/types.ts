import "express-session";

declare module "express-session" {
    interface SessionData {
        user: {
            role: UserRole,
            id: number
        }
    }

    type UserRole = "driver" | "admin"
}