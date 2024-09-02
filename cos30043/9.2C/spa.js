const app = Vue.createApp({
    data() {
        return {
            store
        }
    },
    mounted() {
        if (!this.store.isAuthenticated) {
            this.$router.replace({ path: "/login" });
        }
    }
});

const routes = [
    { path: "/login", component: LoginComponent },
    { path: "/dashboard", component: DashboardComponent }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
});

app.use(router).mount("#app");