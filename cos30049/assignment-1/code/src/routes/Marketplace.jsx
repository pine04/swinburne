/*
    Name: Nguyen Quang Huy
    Student ID: 
    Description: 
*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import CardBody from "../components/CardBody";
import CardTitle from "../components/CardTitle";
import CardSubtitle from "../components/CardSubtitle";
import CardFooter from "../components/CardFooter";
import { Link } from "react-router-dom";

let cards = [
    {
        imageSrc: "/avatar_1.jpg",
        name: "The Dripper I",
        owner: "user1234",
        price: "4.20",
        day: "01/01/2024"
    },
    {
        imageSrc: "/avatar_2.jpg",
        name: "The Dripper II",
        owner: "user1234",
        price: "4.20",
        day: "01/01/2024"        
    },
    {
        imageSrc: "/avatar_3.jpg",
        name: "The Dripper III",
        owner: "user1234",
        price: "4.20",
        day: "01/01/2024"        
    },
    {
        imageSrc: "/avatar_4.jpg",
        name: "The Dripper IV",
        owner: "user1234",
        price: "4.20",
        day: "01/01/2024"        
    }
];

for (let i = 0; i < 5; i++){
    cards = [...cards, ...cards.slice(0, 4)];
}

export default function Marketplace() {
    return (
        <div>
            <div className="max-w-5xl px-8 pt-12 mx-auto">
                <h1 className="font-display text-5xl text-center">
                    Marketplace
                </h1>

                <p className="my-6 text-center text-xl">
                    Here you can find all the virtual fashion items you love.
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
                </p>

                <SearchBar/>
            </div>

            <div className="max-w-6xl w-fit px-8 py-12 mx-auto grid gap-6 
                            grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {
                    cards.map((props, index) =>
                        <Card key={index} className="max-w-64">
                            <Link to="/items/1">
                                <CardImage imageSrc={props.imageSrc} />
                            </Link>

                            <CardBody>
                                <Link to="/items/1">
                                    <CardTitle text={props.name} />
                                </Link>                                    
                                <CardSubtitle text= {`by ${props.owner}`} />
                            </CardBody> 

                            <CardFooter>
                                <p className="text-xs">
                                    <span className="font-bold">Price</span>
                                    <br />
                                    <span>DRP {props.price}</span>
                                </p>
                                <p className="text-xs text-right">
                                    created on 
                                    <br />
                                    {props.day}
                                </p>
                            </CardFooter>
                        </Card>
                    )
                }
            </div>
        </div>
    );
}

