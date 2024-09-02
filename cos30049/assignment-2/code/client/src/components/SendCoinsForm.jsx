/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The SendCoinsForm component represents a form through which the user can send coins to another user on the platform.
*/

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Form, FormHeader, FormInputNumber, FormInputPassword, FormInputText, FormStatusMessage } from "./Form";
import { Button } from "./Form";

export default function SendCoinsForm() {
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");

    const queryClient = useQueryClient();

    // Used to send the request to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: postSendCoins,
        onSuccess: (data) => {
            if (data.status === 200) {
                setIsError(false);
                clearForm();
                queryClient.refetchQueries({ queryKey: ["transactions"] });
                queryClient.refetchQueries({ queryKey: ["userProfile"] });
            } else {
                setIsError(true);
            }
            setStatusMessage(data.message);
        },
        onError: (error) => {
            console.log(error);
            setIsError(true);
            setStatusMessage("An error occurred.");
        }
    });

    // Contains the request to the server.
    async function postSendCoins() {
        try {
            const response = await fetch("/api/sendCoins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ to: address, amount, password })
            });

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Clears form.
    function clearForm() {
        setAddress("");
        setAmount("");
        setPassword("");
    }

    // Form submit handler.
    function handleSubmit(e) {
        e.preventDefault();
        mutate(null);
    }

    return (
        <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Sending coins...">
            <FormHeader>Send DRP coins</FormHeader>
            <FormStatusMessage message={statusMessage} isError={isError} />

            <FormInputText
                label="Recipient's address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required={true}
            />

            <FormInputNumber
                label="Amount (maximum 1000 DRP)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                max="1000"
                step=".0001"
                required={true}
            />

            <FormInputPassword
                label="Type your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button>Confirm</Button>
        </Form>
    );
}