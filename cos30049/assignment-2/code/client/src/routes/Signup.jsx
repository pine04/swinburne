/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The signup page.
*/

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { AuthContext } from "../contexts/AuthContext";
import { Button, Form, FormInputEmail, FormInputPassword, FormStatusMessage } from "../components/Form";

export default function Signup() {
    const { handleSignUp } = useContext(AuthContext);

    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Used to send the sign up request to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: ({ email, password }) => handleSignUp(email, password),
        onSuccess: (data) => {
            if (data.status !== 200) {
                setIsError(true);
                setStatusMessage(data.message);
            }
        },
        onError: (error) => {
            console.log(error);
            setIsError(true);
            setStatusMessage("An error occurred.");
        }
    });

    // Form submit event handler.
    async function handleSubmit(e) {
        e.preventDefault();
        mutate({ email, password });
    }

    return (
        <div className="px-8 py-12 overflow-x-clip">
            <h1 className="text-5xl font-display text-center">Sign up</h1>

            <p className="my-6 text-center">
                Begin your dripped journey on the Metaverse today!
            </p>

            <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Signing up..." hasCornerHighlights={true} className="max-w-md mx-auto mt-8">
                <FormStatusMessage message={statusMessage} isError={isError} className="text-center" />
                <FormInputEmail
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
                <FormInputPassword
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="mx-auto">Sign up</Button>

                <p className="text-center">
                    Already have an account?
                    <Link to="/login" className="ml-1 underline hover:text-pink transition-colors">Login</Link>.
                </p>
            </Form>
        </div>
    );
}