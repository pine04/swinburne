<template>
    <v-card variant="flat">
        <v-card-item :prepend-avatar="user.profilePicture || '/default_avatar.jpg'">
            <v-card-title>
                <RouterLink :to="`/profile/${user.username}`" style="text-decoration: none; color: black">
                    {{ user.displayName }}
                </RouterLink>
            </v-card-title>
            <v-card-subtitle> @{{ user.username }} </v-card-subtitle>

            <template v-slot:append>
                <v-btn
                    :prepend-icon="user.status === 'Friends' ? 'mdi-check' : ''"
                    :color="user.status === 'Friends' ? 'success' : ''"
                    variant="outlined"
                    @click="() => user.status === 'Not friend' && sendFriendRequest(user.username)"
                >
                    {{ statusToDisplayString[user.status] }}

                    <v-menu v-if="user.status === 'Request sent'" activator="parent">
                        <v-list>
                            <v-list-item @click="() => cancelFriendRequest(user.username)">
                                <v-list-item-title>Cancel request</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-menu v-if="user.status === 'Friends'" activator="parent">
                        <v-list>
                            <v-list-item @click="() => unfriend(user.username)">
                                <v-list-item-title>Unfriend</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-menu v-if="user.status === 'Request received'" activator="parent">
                        <v-list>
                            <v-list-item @click="() => acceptFriendRequest(user.username)">
                                <v-list-item-title>Accept</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="() => declineFriendRequest(user.username)">
                                <v-list-item-title>Decline</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
            </template>
        </v-card-item>

        <v-card-text>
            <p><v-icon icon="mdi-email"></v-icon> {{ user.email }}</p>
            <p><v-icon icon="mdi-account"></v-icon> {{ user.gender }}</p>
            <p>
                <v-icon icon="mdi-cake-variant"></v-icon>
                {{ dateFormat(user.birthdate, "longDate") }}
            </p>
            <p v-if="user.location"><v-icon icon="mdi-map-marker"></v-icon> {{ user.location }}</p>
            <p><v-icon icon="mdi-heart"></v-icon> {{ user.relationshipStatus }}</p>
            <p v-if="user.bio"><v-icon icon="mdi-information"></v-icon> {{ user.bio }}</p>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { defineProps, toRef } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import dateFormat from "dateformat";
import { RouterLink } from "vue-router";

const { currentUsername } = storeToRefs(useAuthStore());

const props = defineProps(["user"]);
const emit = defineEmits([
    "sendRequest",
    "cancelRequest",
    "acceptRequest",
    "declineRequest",
    "unfriend"
]);

const user = toRef(props, "user");

async function sendFriendRequest(recipientUsername) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ recipientUsername })
        };
        const response = await fetch(
            `/api/users/${currentUsername.value}/friend-requests/sent`,
            options
        );
        const data = await response.json();

        if (response.status === 201) {
            emit("sendRequest");
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function cancelFriendRequest(recipientUsername) {
    try {
        const options = {
            method: "DELETE"
        };
        const response = await fetch(
            `/api/users/${currentUsername.value}/friend-requests/sent/${recipientUsername}`,
            options
        );
        const data = await response.json();

        if (response.status === 200) {
            emit("cancelRequest");
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function acceptFriendRequest(senderUsername) {
    try {
        const options = {
            method: "POST"
        };
        const response = await fetch(
            `/api/users/${currentUsername.value}/friend-requests/received/${senderUsername}/accept`,
            options
        );
        const data = await response.json();

        if (response.status === 200) {
            emit("acceptRequest");
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function declineFriendRequest(senderUsername) {
    try {
        const options = {
            method: "DELETE"
        };
        const response = await fetch(
            `/api/users/${currentUsername.value}/friend-requests/received/${senderUsername}`,
            options
        );
        const data = await response.json();

        if (response.status === 200) {
            emit("declineRequest");
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

async function unfriend(username) {
    try {
        const options = {
            method: "DELETE"
        };
        const response = await fetch(
            `/api/users/${currentUsername.value}/friends/${username}`,
            options
        );
        const data = await response.json();

        if (response.status === 200) {
            emit("unfriend");
        }

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const statusToDisplayString = {
    "Not friend": "Add friend",
    "Request sent": "Pending",
    "Request received": "Respond",
    Friends: "Friends"
};
</script>
