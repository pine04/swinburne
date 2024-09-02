import { createWebHashHistory, createRouter } from "vue-router";

import HomeScreen from "@/components/HomeScreen.vue";
import UnitsScreen from "@/components/UnitsScreen.vue";
import TasksScreen from "@/components/TasksScreen.vue";

const routes = [
    { path: "/home", component: HomeScreen },
    { path: "/units", component: UnitsScreen },
    { path: "/tasks", component: TasksScreen }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});