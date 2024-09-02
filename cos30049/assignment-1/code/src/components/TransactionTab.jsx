import { useState } from "react";

import Button from "./Button";
import DRPPurchaseForm from "./DRPPurchaseForm";
import DRPSendForm from "./DRPSendForm";
import TransactionHistory from "./TransactionHistory";

export default function TransactionTab({currentAccount}) {
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
                    <DRPSendForm />
                    :
                    <DRPPurchaseForm />
                }
            </div>

            <TransactionHistory currentAccount={currentAccount}/>
        </div>
    );
}