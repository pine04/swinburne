/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The TransactionHistory component displays a list of transactions the user has made on the platform.
*/

import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../contexts/AuthContext";
import Gradient from "./Gradient";

export default function TransactionHistory() {
    // Used to fetch the list of transactions by the user from the server.
    const { isFetching, data, error } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => fetch("/api/transactions").then(res => res.json()),
        refetchOnWindowFocus: false
    });

    return (
        <Gradient className="p-8">
            {
                isFetching &&
                <p>Loading...</p>
            }

            {
                error &&
                <p>An error happened. Please check back later.</p>
            }
            
            {
                data &&
                data.transactions.map((transaction, index) => (
                    <TransactionItem
                        key={index}
                        {...transaction}
                    />
                ))
            }
        </Gradient>
    );
}

// Displays information of one transaction item.
function TransactionItem({hash, from, to, value, gasFee, time, description}) {
    const { accountAddress } = useContext(AuthContext);

    return (
        <div className="py-2 border-b border-pink break-all">
            <p>
                {new Date(time).toLocaleString()}
            </p>
            <p>
                <span className="font-bold mr-1">Hash:</span>
                {hash}
            </p>
            <p>
                <span className="font-bold mr-1">From:</span>
                {from}
            </p>
            <p>
                <span className="font-bold mr-1">To:</span>
                {to}
            </p>
            <p>
                <span className="font-bold mr-1">Value:</span>
                
                <span className={`text-2xl font-bold ${accountAddress === from ? "text-red-500" : "text-green-500"}`}>
                    {(accountAddress === from ? "-" : "+") + value} DRP
                </span>
            </p>
            {
                accountAddress === from &&
                <p>
                    <span className="font-bold mr-1">Gas fee:</span>
                    <span className="text-red-500 font-bold">
                        -{gasFee} DRP
                    </span>
                </p>
            }
            <p>{description}</p>
        </div>
    );
}