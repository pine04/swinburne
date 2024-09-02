<template>
    <h1 class="mx-4 my-8">My friends</h1>

    <FriendForm></FriendForm>

    <p v-if="isPending">Loading...</p>
    <p v-else-if="isError">{{ error }}</p>
    <v-card v-else v-for="friend in data">
        <v-card-title>{{ friend.first_name + " " + friend.last_name }}</v-card-title>
        <v-card-subtitle>ID: {{ friend.id }}</v-card-subtitle>
        <v-card-text>
            <p>Email: {{ friend.email }}</p>
            <p>Gender: {{ friend.gender }}</p>
            <p>Address: {{ friend.address }}</p>
        </v-card-text>
    </v-card>
</template>

<script setup>
import useFriendQuery from "../queries/useFriendQuery";
import FriendForm from "./FriendForm";

const { isPending, isError, data, error } = useFriendQuery();
</script>