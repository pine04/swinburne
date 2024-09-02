/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: AuthContextProvider provides its children access to the global authentication state and actions.
*/

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [accountAddress, setAccountAddress] = useState("");

    // Called once at the start to query the server if the current user is logged in.
    useEffect(
        () => {
            async function checkIsLoggedIn() {
                try {
                    const res = await fetch("/api/login");
                    const data = await res.json();
                    setIsLoggedIn(data.data.isLoggedIn);
                    setAccountAddress(data.data.accountAddress);
                } catch {
                    console.log("An unexpected error happened. Please try again later.");
                }
            }

            checkIsLoggedIn();
        },
        []
    );

    // Used to send a login request to the server.
    async function handleLogIn(email, password) {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.status === 200) {
                setIsLoggedIn(true);
                setAccountAddress(data.data.accountAddress);
            }

            return data;
        } catch {
            console.log("An unexpected error happened. Please try again later.");
            return {
                status: 400,
                message: "An unexpected error happened. Please try again later."
            }
        }
    }

    // Used to send a log out request to the server.
    async function handleLogOut() {
        try {
            const res = await fetch("/api/logout", { method: "POST" });

            const data = await res.json();

            if (data.status === 200) {
                setIsLoggedIn(false);
                setAccountAddress("");
            }

            return data;
        } catch {
            console.log("An unexpected error happened. Please try again later.");
            return {
                status: 400,
                message: "An unexpected error happened. Please try again later."
            }
        }
    }
    
    // Used to send a sign up request to the server.
    async function handleSignUp(email, password) {
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.status === 200) {
                setIsLoggedIn(true);
                setAccountAddress(data.data.accountAddress);
            }

            return data;
        } catch {
            console.log("An unexpected error happened. Please try again later.");
            return {
                status: 400,
                message: "An unexpected error happened. Please try again later."
            }
        }
    }

    // The value associated with the Context that will be accessed by consumers.
    const value = {
        isLoggedIn,
        accountAddress,
        handleLogIn,
        handleLogOut,
        handleSignUp
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}