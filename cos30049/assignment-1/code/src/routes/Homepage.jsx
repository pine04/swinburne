/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: Source code for the website's homepage.
*/

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";

import LinkButton from "../components/LinkButton";
import Card from "../components/Card";
import CardImage from "../components/CardImage";
import CardBody from "../components/CardBody";
import CardTitle from "../components/CardTitle";
import CardSubtitle from "../components/CardSubtitle";
import CardFooter from "../components/CardFooter";

const mostPopular = [
    {
        imageSrc: "/avatar_2.jpg",
        name: "SynthWave Street Attire",
        owner: "ChicNFTCollector",
        bid: "0.0523",
        views: "128451"
    },
    {
        imageSrc: "/avatar_3.jpg",
        name: "Neon Nomad Ensemble",
        owner: "VogueTokenVault",
        bid: "0.0507",
        views: "123391"
    },
    {
        imageSrc: "/avatar_4.jpg",
        name: "ElectraGlam Girl Gear",
        owner: "TrendyThreadTrader",
        bid: "0.0492",
        views: "119856"
    },
    {
        imageSrc: "/avatar_5.jpg",
        name: "DigiRebel",
        owner: "CoutureCanvasCreator",
        bid: "0.0451",
        views: "118764"
    }
];

export default function Homepage() {
    return (
        <div className="overflow-x-clip">

            {/* The hero section. */}
            <article className="max-w-6xl px-8 py-12 mx-auto md:grid 
                                md:grid-cols-[1fr,auto] md:gap-8 
                                md:items-center">
                
                {/* The splash text, description, and COA buttons. */}
                <div className="h-fit flex flex-col gap-8">

                    <h1 className="font-display text-4xl text-center md:text-5xl
                                   md:text-left">
                        Drip out your virtual avatar with Dripple
                    </h1>

                    <p className="max-w-md mx-auto text-center md:mx-0 
                                  md:text-left">
                        Browse thousands of NFT outfits for your virtual avatar 
                        on Dripple, a community where artists and collectors can
                        trade their favorite virtual looks!
                    </p>

                    <div className="flex flex-wrap gap-5 justify-center 
                                    md:justify-start">
                        <LinkButton to="/marketplace">
                            Explore now
                        </LinkButton>
                        <LinkButton to="/profile">
                            Create account
                        </LinkButton>
                    </div>

                </div>

                {/* The hero image. */}
                <Card className="max-w-64 mx-auto mt-8 md:mt-0">
                    {/* Blur circle at the top left corner of the image. */}
                    <div className="w-64 h-64 rounded-full absolute left-0 top-0
                                    -translate-x-1/2 -translate-y-1/2 -z-10 
                                    bg-pink blur-[128px]"></div>

                    <CardImage imageSrc="/avatar_1.jpg" />

                    <CardFooter>
                        <p className="uppercase">
                            The <br />
                            <span className="font-bold">dripper</span>
                        </p>

                        <p className="text-right">
                            DRP <br />
                            <span className="font-bold">0.0450</span>
                        </p>
                    </CardFooter>

                    {/* Blur circle at the bottom right corner of the image. */}
                    <div className="w-48 h-48 rounded-full absolute left-full 
                                    top-full -translate-x-1/2 -translate-y-1/2 
                                    -z-10 bg-purple blur-[96px]"></div>
                </Card>

            </article>

            {/* The most popular/showcase section. */}
            <article className="max-w-6xl px-8 py-12 mx-auto">

                <h2 className="text-center font-display text-4xl">
                    Most popular
                </h2>

                <Link 
                    to="/marketplace" 
                    className="block w-fit mx-auto mt-4 mb-8 relative 
                               after:absolute after:w-full after:h-0.5 
                               after:left-0 after:top-full after:bg-white 
                               after:scale-0 hover:after:scale-100 
                               after:transition-transform after:origin-left">
                    Explore the full collection 
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
                </Link>

                {/* The featured items. */}
                <div className="w-fit mx-auto grid gap-8 grid-cols-1 
                                sm:grid-cols-2 lg:grid-cols-4">
                    {
                        mostPopular.map((props, index) =>
                            <Card key={index} className="max-w-64">
                                <CardImage imageSrc={props.imageSrc} />

                                <CardBody>
                                    <CardTitle text={props.name} />
                                    <CardSubtitle text={"by " + props.owner} />
                                </CardBody>

                                <CardFooter>
                                    <p>
                                        Top bid <br />
                                        <span className="font-bold">
                                            DRP {props.bid}
                                        </span>
                                    </p>
                                    <p>
                                        <FontAwesomeIcon 
                                            icon={faEye} 
                                            className="mr-2"
                                        />
                                        {props.views}
                                    </p>
                                </CardFooter>
                                
                                {/* Blur circle next to the second card. */}
                                {
                                    index === 1 &&
                                    <div className="w-96 h-96 rounded-full 
                                                    absolute left-0 top-1/2 
                                                    -translate-x-1/2 
                                                    -translate-y-1/2 -z-20
                                                    bg-pink blur-[192px]">
                                    </div>
                                }
                            </Card>
                        )
                    }
                </div>

            </article>

            {/* The join our community section. */}
            <article className="max-w-6xl px-8 py-12 mx-auto relative">
                
                {/* Blur circles on both sides of the section. */}
                <div className="w-96 h-96 rounded-full absolute left-0 top-1/2 
                                -translate-x-1/2 -translate-y-1/2 -z-10 
                                bg-pink blur-[192px]"></div>
                <div className="w-96 h-96 rounded-full absolute left-full 
                                top-2/3 -translate-x-1/2 -translate-y-1/2 -z-10 
                                bg-purple blur-[192px]"></div>

                <h2 className="text-center font-display text-4xl">
                    Join our community
                </h2>
                
                {/* The rotated cards, description, and COA button. */}
                <div className="md:max-w-4xl md:mx-auto md:flex md:items-center 
                                md:justify-between">

                    {/* The rotated cards. */}
                    <div className="w-fit h-96 mx-auto mt-12 mb-24 relative 
                                    md:w-72 md:ml-12 md:mb-12 md:flex-shrink-0">
                        
                        <div className="w-fit -translate-x-8 -rotate-12">
                            <Card className="w-48">
                                <CardImage imageSrc="/avatar_6.jpg" />

                                <CardFooter>
                                    <p className="uppercase">
                                        The <br />
                                        <span className="font-bold">
                                            Goddess
                                        </span>
                                    </p>

                                    <p className="text-right">
                                        DRP <br />
                                        <span className="font-bold">4.20</span>
                                    </p>
                                </CardFooter>
                            </Card>
                        </div>

                        <div className="w-fit absolute left-8 top-0 rotate-12 
                                        translate-y-48 md:left-16 
                                        md:translate-y-32">
                            <Card className="w-48">
                                <CardImage imageSrc="/avatar_7.jpg" />

                                <CardFooter>
                                    <p className="uppercase">
                                        The <br />
                                        <span className="font-bold">
                                            cyborg
                                        </span>
                                    </p>

                                    <p className="text-right">
                                        DRP <br />
                                        <span className="font-bold">
                                            0.0345
                                        </span>
                                    </p>
                                </CardFooter>
                            </Card>
                        </div>

                    </div>
                    
                    {/* The description and COA button. */}
                    <div className="max-w-md mx-auto md:mx-0">
                        <p className="mb-4 text-center md:text-left">
                            Drippler is a growing community of NFT virtual 
                            fashion where artists and collectors can trade the 
                            fits they love. Join us today to discover unique 
                            styles that are sure to drip you out on the 
                            Metaverse!
                        </p>

                        <LinkButton to="/profile" className="mx-auto md:mx-0">
                            Create account
                        </LinkButton>
                    </div>

                </div>

            </article>

        </div>
    );
}