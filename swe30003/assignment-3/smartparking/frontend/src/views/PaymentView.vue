<template>
    <div class="container">
        <h1 class="my-4">Payment Page</h1>

        <div class="mb-3 border rounded p-3" v-if="booking">
            <h2>Invoice</h2>
            <p>Booking ID: {{ booking.id }}</p>
            <p>Arrival: {{ dateFormat(booking.arrival) }}</p>
            <p>Departure: {{ dateFormat(booking.departure) }}</p>
            <p>Slot: {{ booking.slot.slotNumber + " - " + booking.slot.type }}</p>
            <p>Total amount to be paid: {{ booking.cost }} VND</p>
        </div>

        <form @submit.prevent="onSubmit" class="border rounded p-3">
            <p v-if="error" class="alert alert-danger">{{ error }}</p>
            <p v-if="successMessage" class="alert alert-success">
                {{ successMessage }}
                <RouterLink to="/">Back to profile.</RouterLink>
            </p>

            <fieldset :disabled="disabled">
                <div class="mb-3">
                    <label for="paymentMethod" class="form-label">Select a payment method:</label>
                    <select v-model="paymentInformation.paymentMethod" id="paymentMethod" class="form-select">
                        <option value="credit">Credit Card</option>
                        <option value="online_banking">Online Banking</option>
                    </select>
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
    
                <button type="submit" class="btn btn-primary">Pay</button>
            </fieldset>
        </form>

        <div v-if="booking" class="my-3 border rounded p-3">
            <h2>Receipt</h2>
            <p>Total fee: {{ booking.cost }} VND</p>
            <p>Payment method: {{ paymentInformation.paymentMethod }}</p>

            <div v-if="paymentInformation.paymentMethod == 'credit'">
                <p>Card name: {{paymentInformation.cardName}}</p>
                <p>Card number: {{paymentInformation.cardNumber}}</p>
            </div>

            <div v-if="paymentInformation.paymentMethod == 'online_banking'">
                <p>Bank name: {{paymentInformation.bankName}}</p>
                <p>Account number: {{paymentInformation.accountNumber}}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import dateFormat from 'dateformat';

const route = useRoute();

const disabled = ref(false);
const error = ref("");
const successMessage = ref("");
const booking = ref(null);
const paymentInformation = reactive({
    paymentMethod: "credit",
    cardName: "",
    cardNumber: "",
    bankName: "",
    accountNumber: ""
});

watchEffect(async () => {
    try {
        const res = await fetch(`/api/booking/${route.params.bookingId}`);
        const data = await res.json();

        if (res.status !== 200) {
            disabled.value = true;
            error.value = "Cannot retrieve booking information.";
        } else {
            booking.value = data.booking;
        }
    } catch (e) {
        console.log(e);
    }
});

async function onSubmit() {
    if ((paymentInformation.paymentMethod === "credit" && !paymentInformation.cardName && !paymentInformation.cardNumber) ||
        (paymentInformation.paymentMethod === "online_banking" && !paymentInformation.bankName && !paymentInformation.accountNumber)) {
        error.value = 'All fields must be selected before submitting the form';
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
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payment)
        }
        const res = await fetch(`/api/pay/${route.params.bookingId}`, options);
        const data = await res.json();

        if (res.status !== 200) {
            error.value = data.message;
        } else {
            error.value = "";
            successMessage.value = data.message;
            disabled.value = true;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>