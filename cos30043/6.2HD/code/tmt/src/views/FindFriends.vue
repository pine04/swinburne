<template>
    <v-main>
        <v-container>
            <h1 class="my-5">Search for friends</h1>
            <v-form @submit="handleSubmit">
                <v-row align="center">
                    <v-col cols="3">
                        <v-text-field
                            label="Name"
                            prepend-inner-icon="mdi-magnify"
                            variant="outlined"
                            hide-details
                            v-model="searchOptions.nameQuery"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            label="Location"
                            prepend-inner-icon="mdi-map-marker"
                            variant="outlined"
                            hide-details
                            v-model="searchOptions.location"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            prepend-inner-icon="mdi-heart"
                            label="Relationship status"
                            :items="['', 'Single', 'Dating', 'Engaged', 'Married', 'Undisclosed']"
                            variant="outlined"
                            hide-details
                            v-model="searchOptions.relationshipStatus"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-btn variant="outlined" type="submit">Search</v-btn>
                    </v-col>
                </v-row>
            </v-form>

            <v-divider class="my-5"></v-divider>

            <p v-if="users.length === 0">No users to show.</p>

            <UserCard
                v-for="user in users"
                :user="user"
                @send-request="() => updateStatus(user.username, 'Request sent')"
                @cancel-request="() => updateStatus(user.username, 'Not friend')"
                @accept-request="() => updateStatus(user.username, 'Friends')"
                @decline-request="() => updateStatus(user.username, 'Not friend')"
                @unfriend="() => updateStatus(user.username, 'Not friend')"
            ></UserCard>
        </v-container>
    </v-main>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import UserCard from "@/components/UserCard.vue";

const route = useRoute();

const searchOptions = reactive({
    nameQuery: route.query.nameQuery || "",
    location: route.query.location || "",
    relationshipStatus: route.query.relationshipStatus || ""
});

const users = ref([]);

function updateStatus(username, status) {
    users.value.find((user) => user.username === username).status = status;
}

function handleSubmit(event) {
    event.preventDefault();
    getUsers();
}

onMounted(() => {
    getUsers();
});

async function getUsers() {
    try {
        const response = await fetch(
            `/api/users?nameQuery=${searchOptions.nameQuery}&location=${searchOptions.location}&relationshipStatus=${searchOptions.relationshipStatus}`
        );
        const data = await response.json();
        if (response.status === 200) {
            users.value = data.users;
        } else {
            users.value = [];
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
