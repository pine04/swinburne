import { useState } from "react";

import Gradient from "./Gradient";
import Button from "./Button";

export default function DRPPurchaseForm() {
    const [amount, setAmount] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Gradient>
            <form 
                method="POST" 
                onSubmit={handleSubmit} 
                className="p-4 flex flex-col gap-4">

                <h2 className="text-2xl font-bold">Buy DRP coins</h2>

                <label className="flex flex-col gap-1 font-bold">
                    Amount: 
                    <input 
                        type="number" 
                        name="amount" 
                        min="0" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        className="px-2 py-1 border-2 border-pink 
                                   rounded-2xl font-normal bg-pink/20 
                                   outline-none focus:outline-2 
                                   focus:outline-offset-2 
                                   focus:outline-pink"
                    />
                </label>

                <p>
                    <span className="font-bold mr-1">Cost:</span> 
                    ${amount * 1000} (1 DRP = 1000 US dollars)
                </p>

                <label className="flex flex-col gap-1 font-bold">
                    Password to confirm: 
                    <input 
                        type="password" 
                        name="password" 
                        className="px-2 py-1 border-2 border-pink 
                                   rounded-2xl font-normal bg-pink/20 
                                   outline-none focus:outline-2 
                                   focus:outline-offset-2 
                                   focus:outline-pink"
                    />
                </label>

                <Button>Confirm</Button>

            </form>
        </Gradient>
    );
}