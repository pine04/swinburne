const store = Vue.reactive({
    isAuthenticated: false,
    authenticate() {
        this.isAuthenticated = true;
    },
    unauthenticate() {
        this.isAuthenticated = false;
    }
});