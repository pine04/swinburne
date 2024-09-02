<template>
	<img alt="Vue logo" src="./assets/logo.png" class="vue-logo">
	<NavigationBar />
	<RouterView />
</template>

<script>
import { RouterView } from "vue-router";
import NavigationBar from "./components/NavigationBar";

export default {
	name: 'App',
	components: {
		RouterView,
		NavigationBar
	}
}
</script>

<style scoped>
.vue-logo {
	display: block;
	margin: 3rem auto;
}
</style>
