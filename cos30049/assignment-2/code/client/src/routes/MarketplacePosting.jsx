/*
    Name: Tran Hoang Hai Anh
    Student ID: 104177513
    Description: The Marketplace posting page.
*/

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Gradient from "../components/Gradient";
import LinkButton from "../components/LinkButton";
import { Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardImage } from "../components/Card";

export default function MarketplacePosting() {
    const { id } = useParams();

    // Used to fetch information of the posting from the server.
    const { isFetching, data, error } = useQuery({
        queryKey: ["posting", id],
        queryFn: () => fetch(`/api/marketplace/${id}`).then(res => res.json()),
        refetchOnWindowFocus: false
    });

    return (
        <div>
            {/* Link to go back to the marketplace page. */}
            <div className="max-w-6xl px-8 mx-auto">
                <Link to="/marketplace" className="w-fit block relative after:w-full after:h-0.5 after:absolute after:left-0 after:top-full after:scale-x-0 after:origin-left after:bg-white after:transition-transform hover:after:scale-x-100">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-4"/>
                    Back to marketplace
                </Link>
            </div>

            {
                isFetching &&
                <p>Loading...</p>
            }

            {
                error &&
                <p>An error happened. Please try again later.</p>
            }

            {
                data &&
                <PostingDetails nft={data.item} />
            }
        </div>
    );
}

// Displays the posting details.
function PostingDetails({ nft }) {
    return (
        <article className="max-w-6xl px-8 py-12 mx-auto relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8">
            <div className="w-fit h-fit mx-auto md:mx-0 md:sticky md:top-6">
                <Card className="max-w-64">
                    <CardImage imageSrc={`http://localhost:8000/uploads/${nft.splashImage}`} />

                    <CardBody>
                        <CardTitle text={nft.name} />
                        <CardSubtitle text={"Token ID: " + nft.tokenId} className="my-2" />
                        <CardSubtitle text={`Minted on ${new Date(nft.timeMinted).toLocaleString()}`} className="my-2" />
                        <CardSubtitle text={`Posted by @${nft.username} on ${new Date(nft.timePosted).toLocaleString()}`} className="break-words" />
                    </CardBody>

                    <CardFooter>
                        {
                            !nft.isTraded ?
                            <p>
                                DRP:
                                <span className="ml-1 text-2xl font-bold">{nft.price}</span>
                            </p>
                            :
                            <p>This trade is no longer available.</p>
                        }
                    </CardFooter>
                </Card>
            </div>

            <Gradient className="p-8">
                <h1 className="my-4 text-2xl font-bold">{nft.name}</h1>

                <p className="my-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                    This item is an NFT.
                </p>

                <h2 className="text-lg font-bold mt-4">Type</h2>
                <p>{nft.type}</p>

                <h2 className="text-lg font-bold mt-4">Collection</h2>
                <p>{nft.collection}</p>

                <h2 className="text-lg font-bold mt-4">Description</h2>
                <p>{nft.description}</p>

                <LinkButton to={`/purchase/${nft.postingId}`} className="mt-4">
                    Purchase
                </LinkButton>
            </Gradient>
        </article>
    );
}