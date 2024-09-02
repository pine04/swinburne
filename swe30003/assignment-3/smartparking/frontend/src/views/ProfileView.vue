<template>
    <div class="container" v-if="currentDriver">
        <div class="my-5">
            <h2>Driver Information</h2>
            <p>Name: {{ currentDriver.name }}</p>
            <p>Email: {{ currentDriver.email }}</p>
            <p>DOB: {{ currentDriver.dob }}</p>
            <p>Phone: {{ currentDriver.phone }}</p>
            <p>Address: {{ currentDriver.address }}</p>

            <button @click="handleLogout" class="btn btn-primary">Log out</button>
        </div>

        <div class="my-5">
            <h2>Bookings</h2>
            <RouterLink to="/booking" class="btn btn-primary mb-3">Book a slot</RouterLink>

            <p v-if="bookings.length === 0" class="my-2">You have not made any bookings.</p>
            <div v-else v-for="booking in bookings">
                <p>ID: {{ booking.id }}</p>
                <p>Slot: {{ booking.slot.slotNumber + " - " + booking.slot.type }}</p>
                <p>Arrival: {{ dateFormat(booking.arrival) }}</p>
                <p>Departure: {{ dateFormat(booking.departure) }}</p>
                <hr>
            </div>
        </div>

        <div class="my-5">
            <h2>Payments</h2>

            <p v-if="payments.length === 0" class="my-2">You have not made any payments.</p>
            <div v-else v-for="payment in payments">
                <p>Session information: From {{ dateFormat(payment.parkingSession.arrival) }} to {{ dateFormat(payment.parkingSession.departure) }} at slot {{ payment.parkingSession.slot.slotNumber }} for {{ payment.parkingSession.slot.slotType }}.</p>
                <p>Payment information: {{ payment.paymentMethod }} - {{ payment.cardName || payment.bankName }} - {{ payment.cardNumber || payment.accountNumber }}</p>
                <hr>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDriverAuthStore } from '../stores/driver_auth';
import { RouterLink, useRouter } from 'vue-router';
import { watchEffect, ref } from 'vue';
import dateFormat from 'dateformat';

const { currentDriver } = storeToRefs(useDriverAuthStore());
const { logout } = useDriverAuthStore();
const bookings = ref([]);
const bookingError = ref("");

const payments = ref([]);
const paymentError = ref("");

const router = useRouter();

watchEffect(async () => {
    try {
        const bookingRes = await fetch("/api/driver/bookings");
        const bookingData = await bookingRes.json();

        if (bookingRes.status === 200) {
            bookings.value = bookingData.bookings;
        } else {
            bookingError.value = bookingData.message;
        }

        console.log(bookingData);
    } catch (error) {
        bookingError.value = "Cannot get bookings at the moment.";
        console.log(error);
    }

    try {
        const paymentRes = await fetch("/api/payments");
        const paymentData = await paymentRes.json();

        if (paymentRes.status === 200) {
            payments.value = paymentData.payments;
        } else {
            paymentError.value = paymentData.message;
        }

        console.log(paymentData);
    } catch (error) {
        paymentError.value = "Cannot get payments at the moment.";
        console.log(error);
    }
});

async function handleLogout() {
    try {
        const { status, data } = await logout();

        if (status === 200) {
            router.push("/driver/signin");
        } else {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}

</script>