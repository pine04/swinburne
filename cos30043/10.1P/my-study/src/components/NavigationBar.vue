<template>
    <nav>
        <RouterLink 
            to="/home" 
            :class="{ active: currentRoute === '/home' }"
        >
            Home
        </RouterLink>
        <RouterLink 
            to="/units" 
            :class="{ active: currentRoute === '/units' }"
        >
            Units
        </RouterLink>
        <RouterLink 
            to="/tasks" 
            :class="{ active: currentRoute === '/tasks' }"
        >
            Tasks
        </RouterLink>
    </nav>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    components: {
        RouterLink
    },
    computed: {
        currentRoute() {
            return this.$route.path;
        }
    }
}
</script>

<style scoped>
nav {
    display: flex;
    gap: 1rem;
    width: fit-content;
    margin: 2rem auto;
}

a {
    display: block;
    color: #35495e;
    font-weight: bold;
}

a:not(:last-of-type) {
    padding-right: 1rem;
    border-right: solid 2px #35495e;
}

a.active {
    color: #41b883;
}
</style>