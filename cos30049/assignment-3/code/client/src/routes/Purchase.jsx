/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The item purchase page.
*/

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button, Form, FormInputPassword, FormStatusMessage } from "../components/Form";

export default function Purchase() {
    const { postingId } = useParams();
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState("");

    // Used to fetch the item information from the server.
    const { isFetching: isFetchingPosting, data: postingData, error: postingError } = useQuery({
        queryKey: ["purchase", postingId],
        queryFn: () => fetch(`/api/marketplace/${postingId}`).then(res => res.json()),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

    // Used to fetch the user's balance from the server.
    const { isFetching: isFetchingBalance, data: balanceData, error: balanceError } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => fetch("/api/profile").then(res => res.json()),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });

    // Used to send the purchase request to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: postPurchase,
        onSuccess: (data) => {
            if (data.status === 200) {
                setIsError(false);
            } else {
                setIsError(true);
            }
            setStatusMessage(data.message);
        },
        onError: (error) => {
            console.log(error);
            setStatusMessage("An error occurred. Please try again.");
            setIsError(true);
        }
    });

    // Contains the request to the server.
    async function postPurchase() {
        try {
            const response = await fetch("/api/purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postingId, password })
            });

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Form submit event handler.
    async function handleSubmit(e) {
        e.preventDefault();
        mutate(null);
    }

    return (
        <div className="px-8 py-12 overflow-x-clip">
            <h1 className="text-5xl font-display text-center">Confirm purchase</h1>
            <p className="my-6 text-center">
                You are just one step away from dripped greatness!
            </p>

            <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Processing purchase..." hasCornerHighlights={true} className="p-8 max-w-xl mx-auto">
                {
                    (isFetchingPosting || isFetchingBalance) &&
                    <p className="text-center">Loading...</p>
                }

                {
                    (postingError || balanceError) &&
                    <p className="text-center">An error happened. Please try again later.</p>
                }

                {
                    postingData && postingData.item.isTraded !== 0 &&
                    <p className="text-center">This purchase is no longer available.</p>
                }

                {
                    postingData && balanceData && !postingData.item.isTraded &&
                    <>
                        <FormStatusMessage message={statusMessage} isError={isError} />
        
                        <p>You are about to purchase {postingData.item.name} from @{postingData.item.username}.</p>
        
                        <img src={`http://localhost:8000/uploads/${postingData.item.splashImage}`} className="block mx-auto max-w-64 rounded-2xl" />
        
                        <p>
                            Your balance: 
                            <span className="ml-1 text-xl font-bold text-green-300">DRP {balanceData.accountInformation.balance}</span>
                        </p>
                        <p>
                            NFT price: 
                            <span className="ml-1 text-xl font-bold text-red-300">DRP {postingData.item.price}</span>
                        </p>
        
                        <p>Please be aware that you will need to pay a small amount of gas fee for each purchase. This amount is negligible.</p>
        
                        <FormInputPassword
                            label="Type your password to confirm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
        
                        <Button className="mx-auto">Purchase</Button>
                    </>
                }
            </Form>
        </div>
    );
}