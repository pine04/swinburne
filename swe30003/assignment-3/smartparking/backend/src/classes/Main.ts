import DriverRepository from "../interfaces/DriverRepository";
import AdminRepository from "../interfaces/AdminRepository";
import ParkingSessionRepository from "../interfaces/ParkingSessionRepository";
import PaymentRepository from "../interfaces/PaymentRepository";
import SlotRepository from "../interfaces/SlotRepository";

import MySQLDriverRepository from "./MySQLDriverRepository";
import MySQLAdminRepository from "./MySQLAdminRepository";
import MySQLParkingSessionRepository from "./MySQLParkingSessionRepository";
import MySQLPaymentRepository from "./MySQLPaymentRepository";
import MySQLSlotRepository from "./MySQLSlotRepository";

export default class Main {
    private static _instance?: Main = undefined;

    private _driverRepository: DriverRepository;
    private _adminRepository: AdminRepository;
    private _parkingSessionRepository: ParkingSessionRepository;
    private _paymentRepository: PaymentRepository;
    private _slotRepository: SlotRepository;

    private constructor() {
        this._driverRepository = MySQLDriverRepository.getRepository();
        this._adminRepository = MySQLAdminRepository.getRepository();
        this._parkingSessionRepository = MySQLParkingSessionRepository.getRepository();
        this._paymentRepository = MySQLPaymentRepository.getRepository();
        this._slotRepository = MySQLSlotRepository.getRepository();
    }

    public static getInstance(): Main {
        if (!Main._instance) {
            Main._instance = new Main();
        }
        return Main._instance;
    }

    public getDriverRepository(): DriverRepository {
        return this._driverRepository;
    }

    public getAdminRepository(): AdminRepository {
        return this._adminRepository;
    }

    public getParkingSessionRepository(): ParkingSessionRepository {
        return this._parkingSessionRepository;
    }

    public getPaymentRepository(): PaymentRepository {
        return this._paymentRepository;
    }

    public getSlotRepository(): SlotRepository {
        return this._slotRepository;
    }
}