<template>
	<div>
		<h2 class="text-center my-5">Admin Signup</h2>
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
			<button type="submit" class="btn btn-primary mb-3 d-block mx-auto">Signup</button>
			<RouterLink to="/admin/signin" class="d-block text-center">Sign in instead.</RouterLink>
			<div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useAdminAuthStore } from '../stores/admin_auth';
import { RouterLink, useRouter } from 'vue-router';

const { register } = useAdminAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref("");

const router = useRouter();

async function onSubmit(event) {
    event.preventDefault();

    try {
		const userDetails = {
			name: name.value,
			email: email.value,
			password: password.value
		};

        const { status, data } = await register(userDetails);

        if (status === 200) {
            router.push("/admin");
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