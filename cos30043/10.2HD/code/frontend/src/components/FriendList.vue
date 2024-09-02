<template>
    <v-navigation-drawer border="md">
        <v-list>
            <p v-if="isPending">Loading...</p>
            <p v-else-if="isError">{{ error }}</p>
            <v-list-item v-else v-for="friend in data" :key="friend">
                {{ friend.first_name + " " + friend.last_name }}
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import useFriendQuery from "../queries/useFriendQuery";

const { isPending, isError, data, error } = useFriendQuery();
</script>