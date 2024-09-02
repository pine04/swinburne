<template>
    <v-app-bar
        v-if="isAuthenticated"
        elevation="0"
        :class="{ 'bg-blue': true, 'px-8': !xs, 'px-4': xs }"
    >
        <v-text-field
            v-if="!xs"
            v-model="searchQuery"
            @keydown.enter="search"
            placeholder="Search for friends"
            variant="outlined"
            density="compact"
            hide-details
            width="100%"
            max-width="32rem"
            prepend-inner-icon="mdi-magnify"
            bg-color="white"
        ></v-text-field>

        <div
            :class="{
                'd-flex align-center': true,
                'ga-4 pl-8 ml-auto': !xs,
                'w-100 justify-space-between': xs
            }"
        >
            <v-btn icon to="/">
                <v-icon icon="mdi-home-outline" size="large"></v-icon>
            </v-btn>

            <v-btn icon to="/find-friends">
                <v-icon icon="mdi-account-group" size="large"></v-icon>
            </v-btn>

            <v-btn icon to="/requests">
                <v-icon icon="mdi-mailbox" size="large"></v-icon>
            </v-btn>

            <v-btn to="/my-profile" icon>
                <v-avatar image="/default_avatar.jpg" size="small"></v-avatar>
            </v-btn>

            <LogoutButton></LogoutButton>

            <v-btn v-if="mobile" icon @click="drawer = !drawer">
                <v-icon icon="mdi-menu" size="x-large"></v-icon>
            </v-btn>
        </div>
    </v-app-bar>

    <v-navigation-drawer
        v-if="isAuthenticated"
        location="right"
        :model-value="!mobile || drawer"
        :permanent="!mobile"
        @update:model-value="(e) => (drawer = e)"
    >
        <div
            v-if="friends.length === 0"
            class="d-flex flex-column justify-center align-center h-100 text-center px-8"
        >
            <v-icon icon="mdi-account-remove" size="96"></v-icon>
            <p>You don't have any friends yet.</p>
        </div>

        <v-list v-else>
            <v-list-item v-for="friend in friends" :to="`/profile/${friend.username}`">
                <template v-slot:prepend>
                    <v-avatar
                        :image="friend.profilePicture || 'default_avatar.jpg'"
                        size="small"
                    ></v-avatar>
                </template>

                <v-list-item-title>
                    {{ friend.displayName }}
                </v-list-item-title>
                <v-list-item-subtitle> @{{ friend.username }} </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import LogoutButton from "./LogoutButton.vue";

const router = useRouter();
const { xs, mobile } = useDisplay();
const { isAuthenticated, currentUsername } = storeToRefs(useAuthStore());

const searchQuery = ref("");
const friends = ref([]);
const drawer = ref(false);

function search() {
    if (searchQuery.value) {
        router.push(`/find-friends?nameQuery=${searchQuery.value}`);
    }
}

watchEffect(async () => {
    if (currentUsername.value) {
        try {
            const response = await fetch(`/api/users/${currentUsername.value}/friends`);
            const data = await response.json();
            friends.value = data.users;
        } catch (error) {
            console.log(error);
        }
    } else {
        friends.value = [];
    }
});
</script>
