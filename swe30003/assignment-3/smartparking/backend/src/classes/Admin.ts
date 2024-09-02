import User from "./User";
import ReportGenerator from "./ReportGenerator";
import PaperReportGenerator from "./PaperReportGenerator";
import CSVReportGenerator from "./CSVReportGenerator";
import WebpageReportGenerator from "./WebpageReportGenerator";
import Main from "./Main";
import ParkingLot from "./ParkingLot";

type AdminParams = {
    id?: number,
    name?: string,
    email?: string,
    password?: string
}

type Report = {
    content: string,
    fileExtension: string
}

export default class Admin extends User {
    private static reportGenerators: {[key: string]: ReportGenerator} = {
        "paper": PaperReportGenerator.getInstance(),
        "csv": CSVReportGenerator.getInstance(),
        "webpage": WebpageReportGenerator.getInstance()
    };
    
    constructor (params: AdminParams) {
        super(params);
    }

    async signup(): Promise<Admin | string> {
        if (this.email === undefined) {
            return "Email missing.";
        }

        const repository = Main.getInstance().getAdminRepository();
        const admin = await repository.getAdminByEmail(this.email);
        if (admin) {
            return "Email has already been used";
        }
        const result = await repository.createAdmin(this);
        return result;
    }

    async signin(): Promise<Admin | string> {
        if (this.email === undefined || this.password === undefined) {
            return "Email or password missing.";
        }

        const repository = Main.getInstance().getAdminRepository();
        const admin = await repository.getAdminByCredentials(this.email, this.password);
        if (admin) {
            return admin;
        } else {
            return "Email or password is not correct.";
        }
    }

    async requestReport(type: string, startTime: Date, endTime: Date, slotNumbers: number[] = []): Promise<Report> {
        const parkingLot = await ParkingLot.getParkingLot();
        const slots = parkingLot.getSlots(slotNumbers);
        const content = await Admin.reportGenerators[type].generateReport(startTime, endTime, slots);
        const fileExtension = Admin.reportGenerators[type].getReportFileExtension();
        return { content, fileExtension };
    }
}