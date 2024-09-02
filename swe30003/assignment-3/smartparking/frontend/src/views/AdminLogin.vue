<template>
	<div>
		<h2 class="text-center my-5">Admin Login</h2>
		<form @submit="onSubmit" class="border rounded">
			<div class="mb-3">
				<label for="email" class="form-label">Email:</label>
				<input type="email" class="form-control" v-model="email" required />
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password:</label>
				<input type="password" class="form-control" v-model="password" required />
			</div>
			<button type="submit" class="btn btn-primary mb-3 d-block mx-auto">Login</button>
			<RouterLink to="/admin/signup" class="d-block text-center">Sign up instead.</RouterLink>
			<div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useAdminAuthStore } from '../stores/admin_auth';
import { RouterLink, useRouter } from 'vue-router';

const { login } = useAdminAuthStore();

const email = ref('');
const password = ref('');
const error = ref("");

const router = useRouter();

async function onSubmit(event) {
    event.preventDefault();

    try {
        const { status, data } = await login(email.value, password.value);

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