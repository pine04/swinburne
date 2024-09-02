<template>
    <v-main>
        <v-container>
            <h2 class="my-5">Sent requests</h2>

            <v-alert
                v-if="sentRequests.length === 0"
                type="info"
                text="You have not sent any friend requests."
                variant="tonal"
            ></v-alert>

            <UserCard 
                v-for="user in sentRequests" 
                :user="user"
                @cancel-request="() => removeSentRequest(user.username)"
            ></UserCard>

            <v-divider></v-divider>

            <h2 class="my-5">Received requests</h2>

            <v-alert
                v-if="receivedRequests.length === 0"
                type="info"
                text="You have not received any friend requests."
                variant="tonal"
            ></v-alert>

            <UserCard
                v-for="user in receivedRequests" 
                :user="user"
                @accept-request="() => removeReceivedRequest(user.username)"
                @decline-request="() => removeReceivedRequest(user.username)"
            ></UserCard>
        </v-container>
    </v-main>
</template>

<script setup>
import UserCard from "@/components/UserCard.vue";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { watchEffect, ref } from "vue";

const { currentUsername } = storeToRefs(useAuthStore());

const receivedRequests = ref([]);
const sentRequests = ref([]);

watchEffect(() => {
    if (currentUsername.value) {
        getReceivedRequests(currentUsername.value);
        getSentRequests(currentUsername.value);
    } else {
        receivedRequests.value = [];
        sentRequests.value = [];
    }
});

function removeSentRequest(username) {
    sentRequests.value = sentRequests.value.filter(user => user.username !== username);
}

function removeReceivedRequest(username) {
    receivedRequests.value = receivedRequests.value.filter(user => user.username !== username);
}

async function getReceivedRequests(username) {
    try {
        const response = await fetch(`/api/users/${username}/friend-requests/received`);
        const data = await response.json();

        if (response.status === 200) {
            receivedRequests.value = data.requests;
        }
    } catch (error) {
        console.log(error);
    }
}

async function getSentRequests(username) {
    try {
        const response = await fetch(`/api/users/${username}/friend-requests/sent`);
        const data = await response.json();

        if (response.status === 200) {
            sentRequests.value = data.requests;
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
