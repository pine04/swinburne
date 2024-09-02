/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The MarketplaceUploadForm component represents a form through which the user can upload one of their NFTs to the market.
*/

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button, Form, FormHeader, FormInputNumber, FormSelect, FormSelectOption, FormStatusMessage } from "./Form";

export default function MarketplaceUploadForm() {
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const [tokenId, setTokenId] = useState("");
    const [price, setPrice] = useState("");

    const queryClient = useQueryClient();

    // Used to fetch the available assets for trading from the server.
    const { isFetching, data, error } = useQuery({
        queryKey: ["collectedAssets"],
        queryFn: () => fetch("/api/collected").then(res => res.json()),
        refetchOnWindowFocus: false
    });

    // Used to send the upload request to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: postMarketplace,
        onSuccess: (data) => {
            if (data.status === 200) {
                setIsError(false);
                clearForm();
                queryClient.refetchQueries({ queryKey: ["uploadedNFTs"] });
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
    async function postMarketplace() {
        try {
            const response = await fetch("/api/marketplace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tokenId, price
                })
            });

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Clears the form.
    function clearForm() {
        setTokenId("");
        setPrice("");
    }

    // Form submit handler.
    function handleSubmit(e) {
        e.preventDefault();
        mutate(null);
    }

    return (
        <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Uploading to marketplace..." className="h-fit">
            <FormHeader>Upload to marketplace</FormHeader>
            <FormStatusMessage message={statusMessage} isError={isError} />

            {
                isFetching &&
                <p>Loading...</p>
            }

            {
                !isFetching &&
                data.assets.length === 0 &&
                <p>You do not have any assets to sell. You can mint assets of your own!</p>
            }

            {
                error &&
                <p>An error happened when loading your collected NFTs. Try again later.</p>
            }

            {
                !isFetching &&
                data.assets.length !== 0 &&
                <>
                    <FormSelect label="NFT" value={tokenId} onChange={(e) => setTokenId(e.target.value)} required={true}>
                        <FormSelectOption value=""></FormSelectOption>
                        {
                            data.assets.map((asset, index) =>
                                <FormSelectOption value={asset.tokenId} key={index}>
                                    {asset.name} - Token ID {asset.tokenId}
                                </FormSelectOption>
                            )
                        }
                    </FormSelect>
                    <FormInputNumber
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step=".0001"
                        required={true}
                    />
                    <Button>Upload</Button>
                </>
            }
        </Form>
    );
}