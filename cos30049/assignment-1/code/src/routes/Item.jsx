/*
    Name: Tran Hoang Hai Anh
    Student ID: 
    Description: 
*/

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowLeft, 
    faExclamationCircle, 
    faEye, 
    faHeart 
} from "@fortawesome/free-solid-svg-icons";

import Gradient from "../components/Gradient";
import LinkButton from "../components/LinkButton";
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import CardBody from "../components/CardBody";
import CardTitle from "../components/CardTitle";
import CardSubtitle from "../components/CardSubtitle";
import CardFooter from "../components/CardFooter";

const mostPopular = [
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

export default function Item() {
    return (
        <div>

            <div className="max-w-6xl px-8 mx-auto">
                <Link 
                    to="/marketplace"
                    className="w-fit block relative after:w-full after:h-0.5 
                               after:absolute after:left-0 after:top-full 
                               after:scale-x-0 after:origin-left 
                               after:bg-white after:transition-transform 
                               hover:after:scale-x-100">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-4"/>
                    Back to marketplace
                </Link>
            </div>

            <article className="max-w-6xl px-8 py-12 mx-auto relative
                                grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8">

                <div className="w-fit h-fit mx-auto md:mx-0 md:sticky md:top-6">
                    <Card className="max-w-64">
                        
                        <CardImage imageSrc="/avatar_1.jpg" />

                        <CardBody>
                            <CardTitle text="The Dripper" />
                            <CardSubtitle text="owned by User1234"/>
                        </CardBody>

                        <CardFooter>
                            <p>
                                <span className="text-xs">DRP: </span>
                                <span className="font-bold text-lg">0.015</span>
                            </p>
                        </CardFooter>

                    </Card>
                </div>

                <Gradient className="p-8">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <span>
                            <FontAwesomeIcon icon={faEye} className="mr-2"/>
                            3000 views
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faHeart} className="mr-2"/>
                            500 favorites
                        </span>
                    </div>

                    <h1 className="my-4 text-2xl font-bold">The Dripper</h1>

                    <p className="my-2">
                        <FontAwesomeIcon 
                            icon={faExclamationCircle} 
                            className="mr-2"
                        />
                        This item is an NFT.
                    </p>

                    <p className="my-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut tellus elementum sagittis vitae et leo 
                        duis. Diam vulputate ut pharetra sit. 
                    </p>
                    <p className="my-2">
                        Tellus in hac habitasse platea dictumst vestibulum. 
                        Semper risus in hendrerit gravida rutrum quisque non. 
                        Diam volutpat commodo sed egestas egestas fringilla 
                        phasellus faucibus. Cras fermentum odio eu feugiat 
                        pretium nibh ipsum consequat.
                    </p>
                    <p className="my-2">
                        Pellentesque nec nam aliquam sem et tortor consequat id.
                        A erat nam at lectus urna duis convallis convallis. 
                        Metus vulputate eu scelerisque felis imperdiet. 
                        Scelerisque purus semper eget duis at tellus at. 
                    </p>
                    
                    <LinkButton to="/purchase" className="mt-8">
                        Purchase
                    </LinkButton>
                </Gradient>

            </article>

            <article className="max-w-6xl px-8 py-12 mx-auto">
                <h2 className="mb-8 text-center font-display text-3xl">
                    More like this
                </h2>

                <div className="w-fit mx-auto grid gap-6 grid-cols-1 
                                sm:grid-cols-2 lg:grid-cols-4">
                    {
                        mostPopular.map((props, index) =>
                            <Card key={index} className="max-w-64">
                                <Link to="/items/1">
                                    <CardImage imageSrc={props.imageSrc} />
                                </Link>

                                <CardBody>
                                    <Link to="/items/1">
                                        <CardTitle text={props.name} />
                                    </Link>                                    
                                    <CardSubtitle text={"by " + props.owner} />
                                </CardBody>

                                <CardFooter>
                                    <p className="text-sm">
                                        <span className="font-bold">Price</span>
                                        <br />
                                        DRP {props.price}
                                    </p>
                                    <p className="text-sm text-right">
                                        created on <br />
                                        {props.day}
                                    </p>
                                </CardFooter>
                            </Card>
                        )
                    }
                </div>
            </article>

        </div>
    );
}
