import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(undefined);
    const currentUsername = ref("");

    function setAuthenticationState(newState) {
        isAuthenticated.value = !!newState;
    }

    function clearAuthenticationState() {
        isAuthenticated.value = false;
        currentUsername.value = "";
    }

    async function getInitialAuthState() {
        try {
            const response = await fetch("/api/login-status");
            const data = await response.json();
            isAuthenticated.value = data.isLoggedIn;
            currentUsername.value = data.username;
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
                    username: registrationInfo.username,
                    email: registrationInfo.email,
                    password: registrationInfo.password,
                    cfPassword: registrationInfo.cfPassword,
                    displayName: registrationInfo.displayName,
                    gender: registrationInfo.gender,
                    birthdate: dateToISOString(registrationInfo.birthdate),
                    location: registrationInfo.location,
                    relationshipStatus: registrationInfo.relationshipStatus,
                    bio: registrationInfo.bio
                })
            };
            const response = await fetch("/api/register", options);
            const data = await response.json();

            if (response.status === 200) {
                isAuthenticated.value = true;
                currentUsername.value = data.username;
            }

            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async function login(usernameOrEmail, password) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usernameOrEmail, password })
            };
            const response = await fetch("/api/login", options);
            const data = await response.json();

            if (response.status === 200) {
                isAuthenticated.value = true;
                currentUsername.value = data.username;
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
            const response = await fetch("/api/logout", { method: "POST" });
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
        isAuthenticated,
        setAuthenticationState,
        getInitialAuthState,
        currentUsername,
        register,
        login,
        logout
    };
});

function dateToISOString(date) {
    return (
        date.getFullYear().toString().padStart(4, "0") +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0")
    );
}
