/*
    Name #1: Nguyen My Hanh
    Student ID #2: 104221122

    Name #2: Ta Quang Tung
    Student ID #3: 104222196

    Description: The User component represents a card containing the user's information.
*/

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

import Gradient from "./Gradient";
import { Button, Form, FormHeader, FormInputText, FormStatusMessage, FormTextArea } from "./Form";

export default function User() {
    const [isInEdit, setIsInEdit] = useState(false);

    // Used to fetch the user profile from the server.
    const { isPending, data, error } = useQuery({
        queryKey: ["userProfile"],
        queryFn: () => fetch("/api/profile").then(res => res.json()),
        refetchOnWindowFocus: false
    });

    // Opens the edit form.
    function openEdit() {
        setIsInEdit(true);
    }

    // Closes the edit form.
    function closeEdit(e) {
        e.preventDefault();
        setIsInEdit(false);
    }

    return (
        <Gradient>
            <UserBanner />

            {
                isPending &&
                <p className="p-4">Loading...</p>
            }

            {
                error &&
                <p className="p-4">An error happened while trying to get your account information. Please try again later.</p>
            }

            {
                data && !isInEdit &&
                <UserInfo user={data.accountInformation} toogleEdit={openEdit} />
            }

            {
                data && isInEdit &&
                <UserInfoEdit user={data.accountInformation} toogleEdit={closeEdit} />
            }
        </Gradient>
    );
}

// User banner with background picture and profile picture.
function UserBanner() {
    return (
        <div className="h-80 relative">
            <img 
                src="/user_profile.jpg"
                alt="User banner picture."
                className="w-full h-full rounded-t-2xl object-cover" 
            />
            <img 
                src="/user_profile.jpg"
                alt="User profile picture."
                className="w-32 h-32 rounded-full border-4 border-pink absolute bottom-4 left-8 object-cover" 
            />
        </div>
    );
}

// Panel that displays the user's profile information.
function UserInfo({ user, toogleEdit }) {
    return (
        <div className="p-8 sm:flex sm:justify-between sm:items-start sm:gap-8">
            <div className="max-w-3xl flex flex-col gap-4 flex-shrink">
                <p className="font-bold text-3xl break-all">
                    {user.displayName}

                    <button onClick={toogleEdit} className="ml-2 text-xl hover:text-pink transition-colors">
                        <FontAwesomeIcon icon={faPen}/>
                    </button>
                </p>
                <p className="break-all">@{user.username}</p>
                <p className="text-sm">joined {new Date(user.dateJoined).toLocaleDateString()}</p>
                {
                    user.profileDescription.split("\n").map((paragraph, index) =>
                        <p className="my-1" key={index}>{paragraph}</p>
                    )
                }
            </div>

            <div className="mt-8 sm:mt-0 flex flex-col gap-4 flex-shrink-0">
                <p className="sm:text-right">
                    Balance
                    <span className="font-bold text-2xl ml-1">{user.balance} DRP</span>
                </p>
                <p className="sm:text-right">
                    Items owned
                    <span className="font-bold text-2xl ml-1">{user.itemsOwned}</span>
                </p>
                <p className="sm:text-right">
                    Items sold
                    <span className="font-bold text-2xl ml-1">{user.itemsSold}</span>
                </p>
            </div>
        </div>
    );
}

// Form that allows the user to edit their profile information.
function UserInfoEdit({ user, toogleEdit }) {
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [displayName, setDisplayName] = useState(user.displayName);
    const [profileDescription, setProfileDescription] = useState(user.profileDescription);

    const queryClient = useQueryClient();

    // Used to send the request to the server.
    const { isPending, mutate } = useMutation({
        mutationFn: postPatchProfile,
        onSuccess: (data) => {
            if (data.status === 200) {
                setIsError(false);
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
    async function postPatchProfile() {
        try {
            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, displayName, profileDescription })
            });

            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    // Form submit handler.
    function handleSubmit(e) {
        e.preventDefault();
        mutate(null);
    }

    return (
        <Form onSubmit={handleSubmit} isWaitingForResponse={isPending} waitingText="Updating profile..." className="p-4 rounded-t-none bg-none">
            <FormHeader>
                <button onClick={toogleEdit} className="mr-4 hover:text-pink transition-colors">
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                Edit profile
            </FormHeader>
            <FormStatusMessage message={statusMessage} isError={isError} />

            <FormInputText
                label="Display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />

            <FormInputText
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <FormTextArea
                label="Profile description"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
            />

            <Button>Update</Button>
        </Form>
    );
}