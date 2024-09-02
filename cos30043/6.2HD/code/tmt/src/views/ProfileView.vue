<script setup>
import { useAuthStore } from "@/store/auth";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dateFormat from "dateformat";

import LogoutButton from "../components/LogoutButton.vue";
import Feed from "@/components/Feed.vue";

const profile = ref(null);
const router = useRouter();

const { currentUsername, setAuthenticationState } = useAuthStore();

onMounted(async () => {
    try {
        const response = await fetch("/api/my-profile");

        if (response.status === 401) {
            setAuthenticationState(false);
            router.push("/login");
            return;
        }
        const data = await response.json();
        profile.value = data;
    } catch (err) {
        console.log(err);
    }
});
</script>

<template>
    <v-main>
        <v-container>
            <v-row class="position-relative">
                <v-col cols="12" md="3">
                    <div v-if="profile !== null" :class="{ 'px-8': $vuetify.display.smAndDown }">
                        <v-avatar
                            image="/default_avatar.jpg"
                            size="96"
                            class="mx-auto d-block"
                        ></v-avatar>
                        <h1 class="text-center text-truncate">{{ profile.displayName }}</h1>
                        <h2 class="text-center text-truncate font-weight-medium">
                            @{{ profile.username }}
                        </h2>

                        <v-divider class="my-5"></v-divider>

                        <p><v-icon icon="mdi-email"></v-icon> {{ profile.email }}</p>
                        <p><v-icon icon="mdi-account"></v-icon> {{ profile.gender }}</p>
                        <p>
                            <v-icon icon="mdi-cake-variant"></v-icon>
                            {{ dateFormat(profile.birthdate, "longDate") }}
                        </p>
                        <p v-if="profile.location">
                            <v-icon icon="mdi-map-marker"></v-icon> {{ profile.location }}
                        </p>
                        <p v-if="profile.relationshipStatus">
                            <v-icon icon="mdi-heart"></v-icon> {{ profile.relationshipStatus }}
                        </p>

                        <div class="mt-5" v-if="profile.bio">
                            Bio:
                            <p class="mb-5">{{ profile.bio }}</p>
                        </div>

                        <LogoutButton :text="true"></LogoutButton>
                    </div>
                </v-col>

                <v-col cols="12" md="9">
                    <Feed :source="`/api/users/${currentUsername}/posts`"></Feed>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
