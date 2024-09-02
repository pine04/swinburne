export default function TransactionItem({currentAccount, from, to, amount, date}) {
    return (
        <div className="py-2 border-b border-pink">
            <p>
                <span className="font-bold mr-1">Date:</span>
                {date}
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
                <span className="font-bold mr-1">Amount:</span>
                
                <span className={`text-2xl ${currentAccount === from ? 
                                  "text-red-500" : "text-green-500"}`}>
                    {(currentAccount === from ? "-" : "+") + amount}
                </span>
            </p>
        </div>
    );
}