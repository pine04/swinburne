import ReportGenerator from "./ReportGenerator";
import ParkingSession from "./ParkingSession";
import Slot from "./Slot";

export default class CSVReportGenerator extends ReportGenerator {
    private static _instance?: CSVReportGenerator = undefined;

    private constructor() {
        super();
    }

    public static getInstance(): CSVReportGenerator {
        if (!CSVReportGenerator._instance) {
            CSVReportGenerator._instance = new CSVReportGenerator();
        }
        return CSVReportGenerator._instance;
    }

    protected override formatReport(startTime: Date, endTime: Date, sessions: ParkingSession[], slots?: Slot[]): string {
        let output = "";
        const outputSlotNumbers = (!slots || slots.length === 0) ? [...new Set(sessions.map(session => session.slot.slotNumber))] : slots.map(slot => slot.slotNumber);

        output += `Slot Number,Slot Type,# of parking sessions,Total revenue\n`;

        outputSlotNumbers.forEach(slotNumber => {
            let bookingCount = 0;
            let revenue = 0;
            let type = "";

            sessions.forEach(session => {
                if (session.slot.slotNumber === slotNumber) {
                    bookingCount += 1;
                    revenue += session.calculateCost();
                    type = session.slot.type;
                }
            });

            output += `${slotNumber},${type},${bookingCount},${revenue} VND\n`;
        });

        return output;
    }

    public override getReportFileExtension(): string {
        return ".csv";
    }
}