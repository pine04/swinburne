import Gradient from "./Gradient";
import TransactionItem from "./TransactionItem";

const transactions = [
    {
        from: "981zleGITVfnlwFn7u8J",
        to: "vKBrloKe5BEKM4qIF5ef",
        amount: "0.0123",
        date: "01/01/2024"
    },
    {
        from: "R3dk9sJpzp9wi2uKRp6D",
        to: "981zleGITVfnlwFn7u8J",
        amount: "0.0023",
        date: "01/01/2024"
    },
    {
        from: "981zleGITVfnlwFn7u8J",
        to: "sLb48dMZeT2HrRaS9Nw1",
        amount: "0.0323",
        date: "01/01/2024"
    },
    {
        from: "aSHlww81AyR8q6W7mvsK",
        to: "981zleGITVfnlwFn7u8J",
        amount: "0.0153",
        date: "01/01/2024"
    },
    {
        from: "981zleGITVfnlwFn7u8J",
        to: "XstuxZfvYiGSMcaAzDjE",
        amount: "0.0127",
        date: "01/01/2024"
    }
];

export default function TransactionHistory({currentAccount}) {
    return (
        <Gradient className="p-8">
            {
                transactions.map((props, index) => (
                    <TransactionItem
                        key={index}
                        currentAccount={currentAccount}
                        from={props.from}
                        to={props.to}
                        amount={props.amount}
                        date={props.date}
                    />
                ))
            }
        </Gradient>
    );
}