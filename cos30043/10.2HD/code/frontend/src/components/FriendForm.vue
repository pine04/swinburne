<template>
    <v-form variant="outlined" class="mx-4 my-8" style="max-width: 64rem;" @submit="handleFormSubmit">
        <v-row>
            <v-col cols="6">
                <v-text-field label="First name" v-model="form.first_name" variant="outlined" hide-details></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field label="Last name" v-model="form.last_name" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4">
                <v-text-field label="Email" v-model="form.email" variant="outlined" hide-details></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field label="Gender" v-model="form.gender" variant="outlined" hide-details></v-text-field>
            </v-col>
            <v-col cols="4">
                <v-text-field label="Address" v-model="form.address" variant="outlined" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2">
                <v-btn type="submit" variant="outlined" width="100%">Submit</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";

const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    address: ""
});

function handleFormSubmit(e) {
    e.preventDefault();
    mutate();
}

async function addFriend() {
    const options = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    }
    const response = await fetch("http://localhost:8000/friends", options);
    if (!response.ok) {
        throw new Error("Could not add friend.");
    }
    const data = await response.json();
    return data.friend;
}

const queryClient = useQueryClient();

const { mutate } = useMutation({
    mutationFn: addFriend,
    onSuccess: (newFriend) => {
        alert(`Added new friend: ${newFriend.first_name} ${newFriend.last_name}`);
        queryClient.setQueryData(["friends"], (oldData) => [...oldData, newFriend]);
    }
})
</script>