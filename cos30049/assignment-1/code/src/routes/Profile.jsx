import { useState } from "react";

import User from "../components/User";
import Button from "../components/Button";
import CollectedTab from "../components/CollectedTab";
import UploadedTab from "../components/UploadedTab";
import TransactionTab from "../components/TransactionTab";

const myAccountId = "981zleGITVfnlwFn7u8J";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("collected");

    return (
        <div className="max-w-6xl px-8 pb-12 mx-auto">
            <User />

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
                <TransactionTab currentAccount={myAccountId} />
            }
        </div>
    );
}
