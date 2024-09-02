import Card from "../components/Card";
import CardImage from "../components/CardImage";
import CardBody from "../components/CardBody";
import CardTitle from "../components/CardTitle";
import CardSubtitle from "../components/CardSubtitle";
import CardFooter from "../components/CardFooter";

const collectedItems = [
    {
        imageSrc: "/avatar_1.jpg",
        name: "The Dripper I",
        owner: "user1234",
        price: "4.20",
        date: "01/01/2020"
    },
    {
        imageSrc: "/avatar_2.jpg",
        name: "The Dripper II",
        owner: "user1234",
        price: "4.20",
        date: "01/01/2020"
    },
    {
        imageSrc: "/avatar_3.jpg",
        name: "The Drippress III",
        owner: "user1234",
        price: "4.20",
        date: "01/01/2020"
    },
    {
        imageSrc: "/avatar_4.jpg",
        name: "The Drippress IV",
        owner: "user1234",
        price: "4.20",
        date: "01/01/2020"
    },
    {
        imageSrc: "/avatar_5.jpg",
        name: "The Dripper V",
        owner: "user1234",
        price: "4.20",
        date: "01/01/2020"
    },
    {
        imageSrc: "/avatar_6.jpg",
        name: "The Dripper VI",
        owner: "user1234",
        price: "4.20",
        date: "01/01/2020"
    }
];

export default function CollectedTab() {
    return (
        <div className="w-fit mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 
                        lg:grid-cols-4">

            {
                collectedItems.map((props, index) => (
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
                            </p>
                            <p className="text-sm text-right">
                                collected on <br />
                                {props.date}
                            </p>
                        </CardFooter>
                        
                    </Card>
                ))
            }

        </div>
    );
}