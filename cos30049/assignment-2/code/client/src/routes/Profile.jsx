/*
    Name #1: Vu Xuan Sang
    Student ID #1: 104180388

    Name #2: Nguyen My Hanh
    Student ID #2: 104221122

    Name #3: Ta Quang Tung
    Student ID #3: 104222196

    Description: Source code for the profile page.
*/

import { useState } from "react";

import User from "../components/User";
import { Button } from "../components/Form";
import CollectedTab from "../components/CollectedTab";
import UploadedTab from "../components/UploadedTab";
import TransactionTab from "../components/TransactionTab";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("collected");

    return (
        <div className="w-full max-w-6xl px-8 pb-12 mx-auto">
            {/* The user information. */}
            <User />

            {/* Tab buttons to switch between tabs. */}
            <div className="my-12 flex gap-5 flex-wrap justify-start">
                <Button 
                    onClick={() => setActiveTab("collected")} 
                    active={activeTab === "collected"}
                >
                    Collected
                </Button>
                <Button 
                    onClick={() => setActiveTab("uploaded")} 
                    active={activeTab === "uploaded"}
                >
                    Uploaded
                </Button>
                <Button 
                    onClick={() => setActiveTab("transactions")} 
                    active={activeTab === "transactions"}
                >
                    Transactions
                </Button>
            </div>

            {/* Displays the current tab. */}
            {
                activeTab === "collected" &&
                <CollectedTab />
            }

            {
                activeTab === "uploaded" &&
                <UploadedTab />
            }

            {
                activeTab === "transactions" &&
                <TransactionTab />
            }
        </div>
    );
}
