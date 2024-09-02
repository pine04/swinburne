<template>
	<div class="container">
		<h1 class="my-5 text-center">Admin Dashboard</h1>
		<button @click="handleLogout" class="btn btn-primary">Log out</button>

		<form @submit.prevent="submitAllocateSlotForm" class="border rounded p-3 my-5">
			<h2>Allocate session for walk-in drivers</h2>

			<div v-if="allocationError" class="alert alert-danger mt-3">{{ allocationError }}</div>

			<div class="mb-3">
				<label for="slotType" class="form-label">Slot type:</label>
				<select v-model="slotType" id="slotType" class="form-select" required>
					<option value="motorcycle">Motorcycle</option>
					<option value="car">Car</option>
				</select>
			</div>

			<div class="mb-3">
				<label for="departure" class="form-label">Departure time:</label>
				<input type="datetime-local" id="departure" v-model="departure" class="form-control">
			</div>

			<div v-if="allocationSuccess" class="alert alert-success mt-3">{{ allocationSuccess }}</div>

			<button type="submit" class="btn btn-primary mb-3 d-block mx-auto">Allocate</button>
		</form>

        <form @submit.prevent="submitPayment" class="border rounded p-3 my-5">
			<h2>Record payment</h2>

            <p v-if="unpaidSessionError" class="alert alert-danger">{{ unpaidSessionError }}</p>

            <fieldset>
                <div class="mb-3">
                    <label for="slot" class="form-label">Select a parking session:</label>
                    <select v-model="paymentInformation.sessionId" id="slot" class="form-select">
                        <option value="">Please select one</option>
                        <option v-for="session in unpaidSessions" :key="session" :value="session.id">
                            {{ session.slot.slotNumber + " - " + session.slot.type + " - " + dateFormat(session.arrival) + " - " + dateFormat(session.departure) }}
                        </option>
                    </select>
                </div>

				<div class="mb-3">
                    <label for="paymentMethod" class="form-label">Select a payment method:</label>
                    <select v-model="paymentInformation.paymentMethod" id="paymentMethod" class="form-select">
                        <option value="cash">Cash</option>
						<option value="credit">Credit Card</option>
                        <option value="online_banking">Online Banking</option>
                    </select>
                </div>
    
				<div v-if="paymentInformation.paymentMethod == 'cash'" class="mb-3">
					<label for="amountPaid" class="form-label">Amount paid:</label>
					<input type="number" id="amountPaid" v-model="paymentInformation.amountPaid" class="form-control">
				</div>
    
                <div v-if="paymentInformation.paymentMethod == 'credit'" class="mb-3">
                    <label for="cardName" class="form-label">Card Name:</label>
                    <input type="text" id="cardName" v-model="paymentInformation.cardName" class="form-control">
    
                    <label for="cardNumber" class="form-label">Card Number:</label>
                    <input type="text" id="cardNumber" v-model="paymentInformation.cardNumber" class="form-control">
                </div>
    
                <div v-if="paymentInformation.paymentMethod == 'online_banking'" class="mb-3">
                    <label for="bankName" class="form-label">Bank Name:</label>
                    <input type="text" id="bankName" v-model="paymentInformation.bankName" class="form-control">
                    
                    <label for="accountNumber" class="form-label">Account Number:</label>
                    <input type="text" id="accountNumber" v-model="paymentInformation.accountNumber" class="form-control">
                </div>

				<div v-if="unpaidSessionSuccess" class="alert alert-success mt-3">{{ unpaidSessionSuccess }}</div>
    
                <button type="submit" class="btn btn-primary">Record</button>
            </fieldset>
        </form>

		<form @submit.prevent="requestReport" class="border rounded p-3 my-5">
			<h2>Request statistics report</h2>

            <p v-if="reportRequestError" class="alert alert-danger">{{ reportRequestError }}</p>

			<div class="mb-3">
				<label for="slot" class="form-label">Select parking slots:</label>
				<select v-model="slotNumbers" id="slot" class="form-select" multiple style="height: 16rem;">
					<option disabled value="">Select one or more slots. Ignore to select all.</option>
					<option v-for="slot in slots" :key="slot" :value="slot.slotNumber">
						{{ slot.slotNumber + " - " + slot.type }}
					</option>
				</select>
			</div>

			<div class="mb-3">
				<label for="startTime" class="form-label">Arrival time:</label>
				<input type="datetime-local" id="startTime" v-model="startTime" class="form-control">
			</div>

			<div class="mb-3">
				<label for="endTime" class="form-label">Departure time:</label>
				<input type="datetime-local" id="endTime" v-model="endTime" class="form-control">
			</div>

			<div class="mb-3">
				<label for="reportType" class="form-label">Select report type:</label>
				<select v-model="reportType" id="reportType" class="form-select">
					<option value="paper">Paper</option>
					<option value="csv">CSV</option>
					<option value="webpage">Webpage</option>
				</select>
			</div>

			<a :href="outputReport" class="btn btn-primary">Download report</a>
        </form>
	</div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import dateFormat from 'dateformat';
import { useAdminAuthStore } from '../stores/admin_auth';
import { useRouter } from 'vue-router';

const { logout } = useAdminAuthStore();

const slotType = ref("motorcycle");
const departure = ref("");
const allocationError = ref("");
const allocationSuccess = ref("");

const unpaidSessions = ref([]);
const paymentInformation = reactive({
	sessionId: "",
	paymentMethod: "cash",
	amountPaid: "",
    cardName: "",
    cardNumber: "",
    bankName: "",
    accountNumber: ""
});
const unpaidSessionError = ref("");
const unpaidSessionSuccess = ref("");

const slots = ref([]);
const slotNumbers = ref([]);
const startTime = ref("");
const endTime = ref("");
const reportType = ref("paper");
const reportRequestError = ref("");

const router = useRouter();

async function submitAllocateSlotForm() {
	try {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				vehicleType: slotType.value,
				departure: departure.value
			})
		};
		const response = await fetch("/api/walk-in", options);
		const data = await response.json();

		if (response.status === 200) {
			allocationError.value = "";
			allocationSuccess.value = data.message + " Directions: " + data.directions;
		} else {
			allocationError.value = data.message;
			allocationSuccess.value = "";
		}

		await getUnpaidWalkIns();
	} catch (error) {
		console.log(error);
	}
}

async function getUnpaidWalkIns() {
	try {
		const res = await fetch("/api/walk-in/unpaid");
		const data = await res.json();

		if (res.status === 200) {
			unpaidSessions.value = data.sessions;
			unpaidSessionError.value = "";
		} else {
			unpaidSessionError.value = data.message;
			unpaidSessionSuccess.value = "";
		}
	} catch (error) {
		console.log(error);
	}
}

async function submitPayment() {
	if ((paymentInformation.paymentMethod === "cash" && !paymentInformation.amountPaid) ||
		(paymentInformation.paymentMethod === "credit" && !paymentInformation.cardName && !paymentInformation.cardNumber) ||
        (paymentInformation.paymentMethod === "online_banking" && !paymentInformation.bankName && !paymentInformation.accountNumber)) {
		unpaidSessionError.value = 'All fields must be selected before submitting the form';
		unpaidSessionSuccess.value = "";
        return;
    }

    try {
        const payment = {
            paymentMethod: paymentInformation.paymentMethod
        }
        if (paymentInformation.paymentMethod === "credit") {
            payment.cardName = paymentInformation.cardName;
            payment.cardNumber = paymentInformation.cardNumber;
        } else if (paymentInformation.paymentMethod === "online_banking") {
            payment.bankName = paymentInformation.bankName;
            payment.accountNumber = paymentInformation.accountNumber;
        } else if (paymentInformation.paymentMethod === "cash") {
			payment.amountPaid = +paymentInformation.amountPaid;
		}

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payment)
        }
        const res = await fetch(`/api/walk-in/${paymentInformation.sessionId}/pay`, options);
        const data = await res.json();

        if (res.status !== 200) {
            unpaidSessionError.value = data.message;
			unpaidSessionSuccess.value = "";
        } else {
            unpaidSessionError.value = "";
            unpaidSessionSuccess.value = data.message;
        }

		await getUnpaidWalkIns();
    } catch (error) {
        console.log(error);
    }
}

async function requestReport() {
	try {
		const queryParams = [];
		slotNumbers.value.length > 0 && queryParams.push("slotNumbers=" + slotNumbers.value.join(","));
		startTime.value && queryParams.push(`startTime=${startTime.value}`);
		endTime.value && queryParams.push(`endTime=${endTime}`);
		queryParams.push(`type=${reportType.value}`);

		await fetch();
	} catch (error) {
		console.log(error);
	}
}

onMounted(() => getUnpaidWalkIns());

const outputReport = computed(() => {
	const queryParams = [];
	slotNumbers.value.length > 0 && queryParams.push("slotNumbers=" + slotNumbers.value.join(","));
	startTime.value && queryParams.push(`startTime=${startTime.value}`);
	endTime.value && queryParams.push(`endTime=${endTime.value}`);
	queryParams.push(`type=${reportType.value}`);
	return `/api/report?${queryParams.join("&")}`
});

onMounted(async () => {
    try {
        const res = await fetch("/api/slots");
        const data = await res.json();

        if (res.status !== 200) {
            reportRequestDisabled.value = true;
            reportRequestError.value = "Cannot get slot information at the moment. Please try again later.";
        } else {
            slots.value = data.slots;
        }
    } catch (error) {
        console.log(error);
    }
});

async function handleLogout() {
    try {
        const { status, data } = await logout();

        if (status === 200) {
            router.push("/admin/signin");
        } else {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>