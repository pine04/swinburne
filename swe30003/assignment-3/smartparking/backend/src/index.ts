import express, { Request, ErrorRequestHandler, RequestHandler } from "express";
import session, { UserRole } from "express-session";
import f from "session-file-store";
import Driver from "./classes/Driver";
import createHttpError from "http-errors";
import morgan from "morgan";
import ParkingLot from "./classes/ParkingLot";
import OnlinePayment from "./classes/OnlinePayment";
import CreditPayment from "./classes/CreditPayment";
import Main from "./classes/Main";
import OnlineBankingPayment from "./classes/OnlineBankingPayment";
import CashPayment from "./classes/CashPayment";
import Payment from "./classes/Payment";
import Admin from "./classes/Admin";

const FileStore = f(session);

const app = express();
app.use(session({
    secret: "smartparking",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: new FileStore({
        ttl: 1000 * 60 * 60 * 24 * 7
    })
}));
app.use(express.json());
app.use(morgan("dev"));

function requireAuthentication(role: UserRole): RequestHandler {
    return (req, res, next) => {
        if (!req.session.user || req.session.user.role !== role) {
            return next(createHttpError(403, `Not signed in as ${role}`));
        } else {
            next();
        }
    }
}

app.get("/api/driver/login-status", async (req, res, next) => {
    const id = (req.session.user && req.session.user.role === "driver") ? req.session.user.id : undefined;
    let driver;

    if (id !== undefined) {
        const driverRepository = Main.getInstance().getDriverRepository();
        driver = await driverRepository.getDriverById(id);
    }

    res.status(200).json({
        driver: driver ? {
            id: driver.id,
            name: driver.name,
            email: driver.email,
            dob: driver.dob,
            phone: driver.phone,
            address: driver.address
        } : null
    });
});

app.post("/api/driver/signup", async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dob = new Date(req.body.dob);
    const phone = req.body.phone;
    const address = req.body.address;
    
    const driver = new Driver({name, email, password, dob, phone, address});
    try {
        const result = await driver.signup();
        if (typeof result === "string") {
            return next(createHttpError(400, result));
        } else {
            req.session.user = {
                role: "driver",
                id: result.id!
            }
            return res.status(200).json({
                message: "Signed up successfully.",
                driver: {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    dob: result.dob,
                    phone: result.phone,
                    address: result.address
                }
            });
        }
    } catch (error) {
        next(error);
    }
});

app.post("/api/driver/signin", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const driver = new Driver({email, password});
    try {
        const result = await driver.signin();
        if (typeof result === "string") {
            return next(createHttpError(400, result));
        } else {
            req.session.user = {
                role: "driver",
                id: result.id!
            }
            return res.status(200).json({
                message: "Signed in successfully.",
                driver: {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    dob: result.dob,
                    phone: result.phone,
                    address: result.address
                }
            });
        }
    } catch (error) {
        next(error);
    }
});

app.post("/api/driver/signout", (req, res) => {
    if (req.session.user && req.session.user.role === "driver") {
        req.session.user = undefined;
    }

    res.status(200).json({
        message: "Signed out successfully."
    });
});

app.get("/api/driver/bookings", requireAuthentication("driver"), async (req, res, next) => {
    const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
    const bookings = await parkingSessionRepository.getBookings(req.session.user!.id);

    if (bookings === undefined) {
        return res.status(500).json({
            message: "Cannot get bookings at the moment."
        });
    }

    res.status(200).json({
        bookings: bookings.map(booking => ({
            id: booking.id,
            slot: {
                slotNumber: booking.slot.slotNumber,
                type: booking.slot.type
            },
            arrival: booking.arrival,
            departure: booking.departure
        }))
    })
});

app.get("/api/admin/login-status", async (req, res, next) => {
    const id = (req.session.user && req.session.user.role === "admin") ? req.session.user.id : undefined;
    let admin;

    if (id !== undefined) {
        const adminRepository = Main.getInstance().getAdminRepository();
        admin = await adminRepository.getAdminById(id);
    }

    res.status(200).json({
        admin: admin ? {
            id: admin.id,
            name: admin.name,
            email: admin.email
        } : null
    });
});

app.post("/api/admin/signup", async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const admin = new Admin({ name, email, password });
    try {
        const result = await admin.signup();
        if (typeof result === "string") {
            return next(createHttpError(400, result));
        } else {
            req.session.user = {
                role: "admin",
                id: result.id!
            }
            return res.status(200).json({
                message: "Signed up successfully.",
                admin: {
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
            });
        }
    } catch (error) {
        next(error);
    }
});

app.post("/api/admin/signin", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = new Admin({ email, password });
    try {
        const result = await admin.signin();
        if (typeof result === "string") {
            return next(createHttpError(400, result));
        } else {
            req.session.user = {
                role: "admin",
                id: result.id!
            }
            return res.status(200).json({
                message: "Signed in successfully.",
                admin: {
                    id: result.id,
                    name: result.name,
                    email: result.email
                }
            });
        }
    } catch (error) {
        next(error);
    }
});

app.post("/api/admin/signout", (req, res) => {
    if (req.session.user && req.session.user.role === "admin") {
        req.session.user = undefined;
    }

    res.status(200).json({
        message: "Signed out successfully."
    });
})

app.get("/api/slots", async (req, res, next) => {
    const parkingLot = await ParkingLot.getParkingLot();
    res.status(200).json({
        slots: parkingLot.slots.map(slot => ({
            slotNumber: slot.slotNumber,
            type: slot.type
        }))
    });
});

app.post("/api/booking", requireAuthentication("driver"), async (req, res, next) => {
    const slotNumber = +req.body.slotNumber;
    const arrival = new Date(req.body.arrival);
    const departure = new Date(req.body.departure);

    const parkingLot = await ParkingLot.getParkingLot();
    const slot = parkingLot.getSlot(slotNumber);

    if (!slot) {
        return res.status(400).json({
            message: "The slot specified by slotNumber does not exist."
        });
    }

    const driverRepository = Main.getInstance().getDriverRepository();
    const driver = await driverRepository.getDriverById(req.session.user!.id);

    if (!driver) {
        return res.status(403).json({
            message: "Cannot determine who this driver is."
        });
    }

    const booking = await slot.createBooking(driver, arrival, departure);

    if (!booking) {
        return res.status(400).json({
            message: "This slot is not available for booking at the specified time."
        });
    }

    res.status(201).json({
        message: "Booking created successfully",
        booking: {
            id: booking.id!
        }
    });
});

app.get("/api/booking/:bookingId", requireAuthentication("driver"), async (req, res, next) => {
    const bookingId = +req.params.bookingId;

    const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
    const booking = await parkingSessionRepository.getParkingSessionById(bookingId);

    if (!booking) {
        return res.status(400).json({
            message: "Cannot get the booking specified by the booking ID."
        });
    }

    res.status(200).json({
        booking: {
            id: booking.id,
            arrival: booking.arrival,
            departure: booking.departure,
            slot: {
                slotNumber: booking.slot.slotNumber,
                type: booking.slot.type
            },
            cost: booking.calculateCost()
        }
    });
})

app.post("/api/pay/:bookingId", requireAuthentication("driver"), async (req, res, next) => {
    const bookingId = Number(req.params.bookingId);

    const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
    const booking = await parkingSessionRepository.getParkingSessionById(bookingId);

    if (!booking) {
        return next(createHttpError(400, "The booking specified by the provided booking ID does not exist."));
    }

    const paymentMethod = req.body.paymentMethod;

    let payment: OnlinePayment;
    if (paymentMethod === "credit") {
        const cardName = req.body.cardName;
        const cardNumber = req.body.cardNumber;

        payment = new CreditPayment(booking, new Date(), cardName, cardNumber);
    } else if (paymentMethod === "online_banking") {
        const bankName = req.body.bankName;
        const accountNumber = req.body.accountNumber;

        payment = new OnlineBankingPayment(booking, new Date(), bankName, accountNumber);
    } else {
        return next(createHttpError(400, "Payment method is invalid. Must be either 'credit' or 'online_banking'"));
    }

    const paymentResult = payment.withdraw();
    if (paymentResult.success) {
        await payment.recordPayment();

        res.status(200).json({
            message: `Payment success. ${paymentResult.message}`
        });
    } else {
        next(createHttpError(400, paymentResult.message));
    }
});

app.get("/api/payments", requireAuthentication("driver"), async (req, res, next) => {
    const driverId = req.session.user!.id;

    const paymentRepository = Main.getInstance().getPaymentRepository();
    const payments = await paymentRepository.getPaymentsByDriverId(driverId);

    if (!payments) {
        return res.status(400).json({
            message: "Cannot get payments at the moment."
        });
    }

    const results = payments.map(payment => {
        const object: any = {
            parkingSession: {
                id: payment.session.id,
                slot: {
                    slotNumber: payment.session.slot.slotNumber,
                    type: payment.session.slot.type
                },
                arrival: payment.session.arrival,
                departure: payment.session.departure
            },
            timeOfPayment: payment.timeOfPayment,
            paymentMethod: (payment instanceof CreditPayment) ? "Credit" : "Online Banking"
        };

        if (payment instanceof CreditPayment) {
            object.cardName = payment.cardName;
            object.cardNumber = payment.cardNumber;
        } else if (payment instanceof OnlineBankingPayment) {
            object.bankName = payment.bankName;
            object.accountNumber = payment.accountNumber;
        }

        return object;
    });

    res.status(200).json({
        payments: results
    })
});

app.post("/api/walk-in", requireAuthentication("admin"), async (req, res, next) => {
    const vehicleType = req.body.vehicleType;
    const arrival = new Date();
    const departure = new Date(req.body.departure);

    const parkingLot = await ParkingLot.getParkingLot();
    const parkingSession = await parkingLot.allocateWalkInSession(vehicleType, arrival, departure);

    if (!parkingSession) {
        return res.status(400).json({
            message: "Cannot allocate a parking slot that is available during this time. Try adjusting the departure time."
        });
    }

    res.status(200).json({
        message: "Allocated slot successfully.",
        directions: parkingSession.slot.getDirections(),
        parkingSession: {
            id: parkingSession.id!,
            arrival: parkingSession.arrival,
            departure: parkingSession.departure,
            slot: {
                slotNumber: parkingSession.slot.slotNumber,
                type: parkingSession.slot.type
            }
        }
    })
});

app.get("/api/walk-in/unpaid", requireAuthentication("admin"), async (req, res, next) => {
    const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
    const unpaidWalkIns = await parkingSessionRepository.getUnpaidWalkInSessions();

    if (!unpaidWalkIns) {
        return res.status(400).json({
            message: "Cannot get walk-in sessions at the moment. Please try again later."
        });
    }

    res.status(200).json({
        sessions: unpaidWalkIns.map(session => ({
            id: session.id!,
            arrival: session.arrival,
            departure: session.departure,
            slot: {
                slotNumber: session.slot.slotNumber,
                type: session.slot.type
            }
        }))
    });
});

app.post("/api/walk-in/:sessionId/pay", requireAuthentication("admin"), async (req, res, next) => {
    const sessionId = req.params.sessionId;

    const parkingSessionRepository = Main.getInstance().getParkingSessionRepository();
    const walkInSession = await parkingSessionRepository.getWalkInSessionById(+sessionId);

    if (!walkInSession) {
        return res.status(404).json({
            message: "Cannot find the walk-in session specified by the given ID."
        });
    }

    const paymentMethod = req.body.paymentMethod;

    let payment: Payment;
    if (paymentMethod === "cash") {
        const amountPaid = +req.body.amountPaid;
        payment = new CashPayment(walkInSession, new Date(), amountPaid);
    } else if (paymentMethod === "credit") {
        const cardName = req.body.cardName;
        const cardNumber = req.body.cardNumber;
        payment = new CreditPayment(walkInSession, new Date(), cardName, cardNumber);
    } else if (paymentMethod === "online_banking") {
        const bankName = req.body.bankName;
        const accountNumber = req.body.accountNumber;
        payment = new OnlineBankingPayment(walkInSession, new Date(), bankName, accountNumber);
    } else {
        return next(createHttpError(400, "Payment method is invalid. Must be 'cash', 'credit', or 'online_banking'"));
    }

    let paymentResult = undefined;
    if (payment instanceof OnlinePayment) {
        paymentResult = payment.withdraw();

        if (!paymentResult.success) {
            return next(createHttpError(400, paymentResult.message));
        }
    }

    await payment.recordPayment();

    res.status(200).json({
        message: `Payment success. ${paymentResult ? paymentResult.message : ""}`
    });
});

interface ReportRequestQuery {
    type?: string,
    startTime?: string,
    endTime?: string,
    slotNumbers?: string
}

app.get("/api/report", requireAuthentication("admin"), async (req: Request<{}, {}, {}, ReportRequestQuery>, res, next) => {
    const adminRepository = Main.getInstance().getAdminRepository();
    const admin = await adminRepository.getAdminById(req.session.user!.id);

    if (!admin) {
        return res.status(403).json({
            message: "Cannot determine who this admin is."
        });
    }

    const type = req.query.type || "paper";
    const startTime = req.query.startTime && new Date(req.query.startTime) || new Date();
    !req.query.startTime && startTime.setDate(startTime.getDate() - 7);
    const endTime = req.query.endTime && new Date(req.query.endTime) || new Date();
    const slotNumbers = req.query.slotNumbers?.split(",").map(n => +n) || [];
    const report = await admin.requestReport(type, startTime, endTime, slotNumbers);

    res.setHeader('Content-Type', "application/octet-stream");
    res.setHeader('Content-Disposition', `attachment; filename=report${report.fileExtension}`);
    res.send(report.content);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.status === 500 ? "An error happened on the server." : (err.message || "An error happened on the server");

    console.log(err);

    res.status(status).json({ message });
}

app.use("*", (req, res) => {
    res.status(404).json({
        message: "404 Not Found"
    });
});

app.use(errorHandler);

app.listen(8000, () => console.log("Listening on port 8000..."));