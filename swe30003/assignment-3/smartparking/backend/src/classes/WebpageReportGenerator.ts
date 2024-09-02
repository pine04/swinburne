import ReportGenerator from "./ReportGenerator";
import ParkingSession from "./ParkingSession";
import Slot from "./Slot";

export default class WebpageReportGenerator extends ReportGenerator {
    private static _instance?: WebpageReportGenerator = undefined;

    private constructor() {
        super();
    }

    public static getInstance(): WebpageReportGenerator {
        if (!WebpageReportGenerator._instance) {
            WebpageReportGenerator._instance = new WebpageReportGenerator();
        }
        return WebpageReportGenerator._instance;
    }

    protected override formatReport(startTime: Date, endTime: Date, sessions: ParkingSession[], slots?: Slot[]): string {
        let output = "";
        const outputSlotNumbers = (!slots || slots.length === 0) ? [...new Set(sessions.map(session => session.slot.slotNumber))] : slots.map(slot => slot.slotNumber);

        const tableRows = outputSlotNumbers.map(slotNumber => {
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

            return `<tr><td>${slotNumber}</td><td>${type}</td><td>${bookingCount}</td><td>${revenue} VND</td></tr>`;
        });

        output += `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <title>SmartParking Report</title>
                <style>
                    table, thead, tr, th, td {
                        border: solid 1px black;
                        border-collapse: collapse;
                        padding: 0.25rem;
                    }
                </style>
            </head>
            <body>
                <h1>SmartParking Report between ${startTime.toDateString()} and ${endTime.toDateString()}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Slot number</th>
                            <th>Slot type</th>
                            <th># of parking sessions</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </body>
            </html>
        `;

        return output;
    }
    
    public override getReportFileExtension(): string {
        return ".html";
    }
}