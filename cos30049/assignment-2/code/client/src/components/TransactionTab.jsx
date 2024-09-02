/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The TransactionTab component displays the user's transaction history and two forms to send/buy coins.
*/

import { useState } from "react";

import { Button } from "./Form";
import BuyCoinsForm from "./BuyCoinsForm";
import SendCoinsForm from "./SendCoinsForm";
import TransactionHistory from "./TransactionHistory";

export default function TransactionTab() {
    // Used to switch between the buy coin and send coin forms.
    const [transactionType, setTransactionType] = useState("send");

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
                <div className="mb-4 flex gap-5 flex-wrap">
                    <Button 
                        onClick={() => setTransactionType("send")} 
                        active={transactionType === "send"}
                    >
                        Send coins
                    </Button>

                    <Button 
                        onClick={() => setTransactionType("purchase")} 
                        active={transactionType === "purchase"}
                    >
                        Purchase coins
                    </Button>
                </div>

                {
                    transactionType === "send" 
                    ?
                    <SendCoinsForm />
                    :
                    <BuyCoinsForm />
                }
            </div>

            <TransactionHistory />
        </div>
    );
}