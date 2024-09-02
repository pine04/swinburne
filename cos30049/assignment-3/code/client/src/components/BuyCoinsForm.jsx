/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The BuyCoinsForm component represents a form through which the user can purchase coins for trading on the platform.
*/

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Form, FormHeader, FormInputNumber, FormStatusMessage, FormInputPassword } from "./Form";

export default function BuyCoinsForm() {
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");

    const queryClient = useQueryClient();

    // Used to send the request to purchase coins to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: postBuyCoins,
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
    async function postBuyCoins() {
        try {
            const response = await fetch("/api/buyCoins", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount, password })
            });

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Clears form.
    function clearForm() {
        setAmount("");
        setPassword("");
    }

    // Form submit event handler.
    function handleSubmit(e) {
        e.preventDefault();
        mutate(null);
    }

    return (
        <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Processing purchase...">
            <FormHeader>Buy DRP coins</FormHeader>
            <FormStatusMessage message={statusMessage} isError={isError} />

            <FormInputNumber
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                max="1000"
                step=".0001"
                required={true}
            />
            <p>
                <span className="font-bold mr-1">Cost:</span> 
                ${amount * 10} (1 DRP = 10 US dollars)
            </p>
            <FormInputPassword
                label="Type your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button>Confirm</Button>
        </Form>
    );
}