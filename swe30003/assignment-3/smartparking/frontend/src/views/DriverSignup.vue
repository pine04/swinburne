<template>
	<div>
		<h2 class="text-center my-5">Driver Signup</h2>
		<form @submit="onSubmit" class="border rounded">
			<div class="mb-3">
				<label class="form-label" for="name">Name:</label>
				<input class="form-control" type="text" v-model="name" required />
			</div>
			<div class="mb-3">
				<label class="form-label" for="email">Email:</label>
				<input class="form-control" type="email" v-model="email" required />
			</div>
			<div class="mb-3">
				<label class="form-label" for="password">Password:</label>
				<input class="form-control" type="password" v-model="password" required />
			</div>
			<div class="mb-3">
				<label class="form-label" for="dob">Date of Birth:</label>
				<input class="form-control" type="date" v-model="dob" required />
			</div>
			<div class="mb-3">
				<label class="form-label" for="phone">Phone:</label>
				<input class="form-control" type="text" v-model="phone" required />
			</div>
			<div class="mb-3">
				<label class="form-label" for="address">Address:</label>
				<input class="form-control" type="text" v-model="address" required />
			</div>
			<button type="submit" class="btn btn-primary mb-3 d-block mx-auto">Signup</button>
			<RouterLink to="/driver/signin" class="d-block text-center">Sign in instead.</RouterLink>
			<div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useDriverAuthStore } from '../stores/driver_auth';
import { RouterLink, useRouter } from 'vue-router';

const { register } = useDriverAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const dob = ref('');
const phone = ref('');
const address = ref('');
const error = ref("");

const router = useRouter();

async function onSubmit(event) {
    event.preventDefault();

    try {
		const userDetails = {
			name: name.value,
			email: email.value,
			password: password.value,
			dob: dob.value,
			phone: phone.value,
			address: address.value,
		};

        const { status, data } = await register(userDetails);

        if (status === 200) {
            router.push("/");
        } else {
            console.log(data);
			error.value = data.message;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
form {
	max-width: 32rem;
	width: 100%;
	margin: 0 auto;
	padding: 2rem;
}
</style>