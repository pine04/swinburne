<template>
    <div class="container">
        <h1 class="my-4">Booking Page</h1>

        <form @submit.prevent="onSubmit" class="border rounded p-3">
            <p v-if="error" class="alert alert-danger">{{ error }}</p>

            <fieldset :disabled="disabled">
                <div class="mb-3">
                    <label for="slot" class="form-label">Select a parking slot:</label>
                    <select v-model="slotNumber" id="slot" class="form-select">
                        <option disabled value="">Please select one</option>
                        <option v-for="slot in slots" :key="slot" :value="slot.slotNumber">
                            {{ slot.slotNumber + " - " + slot.type }}
                        </option>
                    </select>
                </div>
    
                <div class="mb-3">
                    <label for="arrival" class="form-label">Arrival time:</label>
                    <input type="datetime-local" id="arrival" v-model="arrival" class="form-control">
                </div>
    
                <div class="mb-3">
                    <label for="departure" class="form-label">Departure time:</label>
                    <input type="datetime-local" id="departure" v-model="departure" class="form-control">
                </div>
    
                <button type="submit" class="btn btn-primary">Book</button>
            </fieldset>
        </form>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const disabled = ref(false);
const error = ref("");
const slotNumber = ref();
const arrival = ref("");
const departure = ref("");
const slots = ref([]);

const router = useRouter();

onMounted(async () => {
    try {
        const res = await fetch("/api/slots");
        const data = await res.json();

        if (res.status !== 200) {
            disabled.value = true;
            error.value = "Cannot get slot information at the moment. Please try again later."
        } else {
            slots.value = data.slots;
        }
    } catch (error) {
        console.log(error);
    }
})

async function onSubmit() {
    if (slotNumber.value === undefined || !arrival.value || !departure.value) {
        error.value = 'All fields must be selected before submitting the form';
        return;
    }

    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                slotNumber: slotNumber.value,
                arrival: arrival.value,
                departure: departure.value
            })
        }
        const res = await fetch("/api/booking", options);
        const data = await res.json();

        if (res.status !== 201) {
            error.value = data.message;
        } else {
            router.push(`/payment/${data.booking.id}`);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>