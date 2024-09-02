import Main from "./Main";
import Slot from "./Slot";
import ParkingSession from "./ParkingSession";

export default abstract class ReportGenerator {
    public async generateReport(startTime: Date, endTime: Date, slots: Slot[] = []): Promise<string> {
        const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
        const parkingSessions = await parkingSessionRepository.getParkingSessions(startTime, endTime, slots);

        if (!parkingSessions) {
            return "An error happened while generating the report.";
        }

        return this.formatReport(startTime, endTime, parkingSessions, slots);
    }

    protected abstract formatReport(startTime: Date, endTime: Date, sessions: ParkingSession[], slots?: Slot[]): string;

    public abstract getReportFileExtension(): string;
}