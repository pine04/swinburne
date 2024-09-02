import ItemUploadForm from "./ItemUploadForm";
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import CardBody from "../components/CardBody";
import CardTitle from "../components/CardTitle";
import CardSubtitle from "../components/CardSubtitle";
import CardFooter from "../components/CardFooter";

const uploadedItems = [
    {
        imageSrc: "/avatar_1.jpg",
        name: "The Dripper I",
        price: "4.20",
        date: "01/01/2020",
        sold: false
    },
    {
        imageSrc: "/avatar_2.jpg",
        name: "The Dripper II",
        price: "4.20",
        date: "01/01/2020",
        sold: true
    },
    {
        imageSrc: "/avatar_3.jpg",
        name: "The Drippress III",
        price: "4.20",
        date: "01/01/2020",
        sold: true
    },
    {
        imageSrc: "/avatar_4.jpg",
        name: "The Drippress IV",
        price: "4.20",
        date: "01/01/2020",
        sold: false
    },
    {
        imageSrc: "/avatar_5.jpg",
        name: "The Dripper V",
        price: "4.20",
        date: "01/01/2020",
        sold: true
    },
    {
        imageSrc: "/avatar_6.jpg",
        name: "The Dripper VI",
        price: "4.20",
        date: "01/01/2020",
        sold: false
    }
];

export default function UploadedTab() {
    return (
        <>
            <ItemUploadForm />

            <div className="w-fit mx-auto mt-8 grid gap-6 grid-cols-1 
                            sm:grid-cols-2 lg:grid-cols-4">

                {
                    uploadedItems.map((props, index) => (
                        <Card key={index} className="max-w-64">

                            <CardImage imageSrc={props.imageSrc} />

                            <CardBody>
                                <CardTitle text={props.name} />
                                <CardSubtitle text={props.owner} />
                            </CardBody>

                            <CardFooter>
                                <p className="text-sm">
                                    <span className="font-bold">Price</span>
                                    <br />
                                    DRP {props.price}
                                    <br />
                                    {props.sold ? "SOLD" : "NOT SOLD"}
                                </p>
                                <p className="text-sm text-right">
                                    uploaded on <br />
                                    {props.date}
                                </p>
                            </CardFooter>

                        </Card>
                    ))
                }

            </div>
        </>
    );
}