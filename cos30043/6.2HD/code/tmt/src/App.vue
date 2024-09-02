<script setup>
import AppBar from "./components/AppBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <v-app>
        <AppBar></AppBar>
        <RouterView />
    </v-app>
</template>
