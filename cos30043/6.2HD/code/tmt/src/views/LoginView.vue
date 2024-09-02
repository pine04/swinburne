<template>
    <div class="body">
        <v-form @submit="onSubmit" class="form rounded-lg my-16">
            <h1 class="text-center my-5">Login</h1>

            <v-alert v-if="error" type="error" variant="tonal" :text="error" class="my-5"></v-alert>

            <v-text-field
                v-model="formData.usernameOrEmail"
                variant="outlined"
                label="Username or email"
            ></v-text-field>

            <v-text-field
                v-model="formData.password"
                variant="outlined"
                label="Password"
                type="password"
            ></v-text-field>

            <v-btn variant="outlined" type="submit" class="d-block mx-auto">Login</v-btn>

            <p class="text-center mt-5">
                Don't have an account? <router-link to="/register">Register.</router-link>
            </p>
        </v-form>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const { login } = useAuthStore();

const formData = reactive({
    usernameOrEmail: "",
    password: ""
});
const error = ref("");

const router = useRouter();

async function onSubmit(event) {
    event.preventDefault();

    try {
        const { status, data } = await login(formData.usernameOrEmail, formData.password);

        if (status === 200) {
            router.push("/");
        } else {
            error.value = data.message;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
.body {
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 2rem;
    background-image: url("../../public/background.png");
    background-size: cover;
}

.form {
    background-color: white;
    max-width: 32rem;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
}
</style>
