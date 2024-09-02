import { ref } from "vue";
import { defineStore } from "pinia";

export const useDriverAuthStore = defineStore("driver-auth", () => {
    const currentDriver = ref(undefined);

    function clearAuthenticationState() {
        currentDriver.value = null;
    }

    async function getInitialAuthState() {
        try {
            const response = await fetch("/api/driver/login-status");
            const data = await response.json();
            currentDriver.value = data.driver;
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
                    password: registrationInfo.password,
                    dob: dateToISOString(new Date(registrationInfo.dob)),
                    phone: registrationInfo.phone,
                    address: registrationInfo.address
                })
            };
            const response = await fetch("/api/driver/signup", options);
            const data = await response.json();

            if (response.status === 200) {
                currentDriver.value = data.driver;
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
            const response = await fetch("/api/driver/signin", options);
            const data = await response.json();

            if (response.status === 200) {
                currentDriver.value = data.driver;
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
            const response = await fetch("/api/driver/signout", { method: "POST" });
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
        currentDriver, 
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
