/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The MintForm component represents a form through which the user can mint an NFT on the platform.
*/

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Form, FormHeader, FormInputFile, FormInputPassword, FormInputText, FormSelect, FormSelectOption, FormStatusMessage, FormTextArea } from "./Form";

// Allowed types of NFTs that the user can select.
const allowedTypes = ["Clothing", "Accessories", "Footwear", "Hairstyles", "Makeup", "Body Modifications"];

export default function MintForm() {
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const [name, setName] = useState("");
    const [collection, setCollection] = useState("");
    const [type, setType] = useState(allowedTypes[0]);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [password, setPassword] = useState("");

    const fileInputRef = useRef(null);
    const queryClient = useQueryClient();

    // Used to send mint request to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: postMintRequest,
        onSuccess: (data) => {
            if (data.status === 200) {
                setIsError(false);
                clearForm();
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
    async function postMintRequest() {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("collection", collection);
        formData.append("type", type);
        formData.append("description", description);
        formData.append("password", password);
        formData.append("splash", image, image.name);

        try {
            const response = await fetch("/api/mint", {
                method: "POST",
                body: formData
            });

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Clears the form.
    function clearForm() {
        setName("");
        setCollection("");
        setType(allowedTypes[0]);
        setDescription("");
        setPassword("");
        setImage(null);
        fileInputRef.current.value = "";
    }

    // Form submit event handler.
    function handleSubmit(e) {
        e.preventDefault();
        mutate(null);
    }

    return (
        <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Minting...">
            <FormHeader>Mint an NFT</FormHeader>
            <FormStatusMessage message={statusMessage} isError={isError} />

            <FormInputText
                label="NFT name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                placeholder="E.g. The Dripper"
            />
            <FormInputText
                label="Collection"
                value={collection}
                onChange={(e) => setCollection(e.target.value)}
                required={true}
                placeholder="E.g. Drip Collection"
            />
            <FormSelect label="NFT type" value={type} onChange={(e) => setType(e.target.value)} required={true}>
                {
                    allowedTypes.map((type, index) => 
                        <FormSelectOption value={type} key={index}>
                            {type}
                        </FormSelectOption>
                    )
                }
            </FormSelect>
            <FormTextArea
                label="NFT description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={true}
                placeholder="E.g. My awesome NFT fashion item"
            />
            <FormInputFile
                ref={fileInputRef}
                label="Image (.png, .jpg, .jpeg, .webp only)"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={(e) => setImage(e.target.files[0])}
                required={true}
            />
            <FormInputPassword
                label="Type your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p>Warning: Minting an asset costs a fixed fee of 0.5 DRP and incurs some negligible additional gas fees.</p>

            <Button>Confirm</Button>
        </Form>
    );
}