/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: Wrapper component which redirects the user to the login form if they are not logged in.
*/

import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ redirectTo = "/login", children }) {
    const { isLoggedIn } = useContext(AuthContext);

    // If the state of isLoggedIn is unknown, tell the user to wait.
    if (isLoggedIn === null) {
        return <p>Please wait...</p>
    }

    // If isLoggedIn is false, redirect to login page.
    if (!isLoggedIn) {
        return <Navigate to={redirectTo} replace />
    }

    // Otherwise, display the child element.
    return children;
}