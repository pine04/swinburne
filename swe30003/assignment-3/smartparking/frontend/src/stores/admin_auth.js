import { ref } from "vue";
import { defineStore } from "pinia";

export const useAdminAuthStore = defineStore("admin-auth", () => {
    const currentAdmin = ref(undefined);

    function clearAuthenticationState() {
        currentAdmin.value = null;
    }

    async function getInitialAuthState() {
        try {
            const response = await fetch("/api/admin/login-status");
            const data = await response.json();
            currentAdmin.value = data.admin;
        } catch (error) {
            console.log(error);
        }
    }

    async function register(registrationInfo) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: registrationInfo.name,
                    email: registrationInfo.email,
                    password: registrationInfo.password
                })
            };
            const response = await fetch("/api/admin/signup", options);
            const data = await response.json();

            if (response.status === 200) {
                currentAdmin.value = data.admin;
            }

            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function login(email, password) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            };
            const response = await fetch("/api/admin/signin", options);
            const data = await response.json();

            if (response.status === 200) {
                currentAdmin.value = data.admin;
            }

            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function logout() {
        try {
            const response = await fetch("/api/admin/signout", { method: "POST" });
            const data = await response.json();
    
            if (response.status === 200) {
                clearAuthenticationState();
            }

            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return {
        getInitialAuthState,
        clearAuthenticationState,
        currentAdmin, 
        register, 
        login, 
        logout 
    };
});