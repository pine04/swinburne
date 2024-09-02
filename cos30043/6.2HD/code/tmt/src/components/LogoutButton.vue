<template>
    <v-btn @click="handleLogout" :icon="!props.text" :variant="props.text ? 'outlined' : undefined">
        <v-icon v-if="!props.text" icon="mdi-logout" size="large"></v-icon>
        <span v-else>Logout</span>
    </v-btn>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const props = defineProps(["text"]);

const router = useRouter();

const store = useAuthStore();
const { logout } = store;

async function handleLogout() {
    try {
        const { status, data } = await logout();

        if (status === 200) {
            router.push("/login");
        } else {
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
