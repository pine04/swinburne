/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: Wrapper component which redirects the user to the profile page if they are already logged in.
*/

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function UnauthenticatedRoute({ redirectTo = "/profile", children }) {
    const { isLoggedIn } = useContext(AuthContext);

    // If the state of isLoggedIn is unknown, tell the user to wait.
    if (isLoggedIn === null) {
        return <p>Please wait...</p>
    }

    // If the user is already logged in, redirect them to the profile page.
    if (isLoggedIn) {
        return <Navigate to={redirectTo} replace />
    }

    // Otherwise, show the child element.
    return children;
}