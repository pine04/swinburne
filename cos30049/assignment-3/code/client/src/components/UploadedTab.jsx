/*
    Name #1: Vu Xuan Sang
    Student ID #1: 104180388

    Name #2: Ta Quang Tung
    Student ID #2: 104222196

    Description: The UploadedTab component displays a list of items the user has uploaded to the market, a form to mint NFTs, and a form to upload NFTs.
*/

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardImageAnimated } from "./Card";
import MintForm from "./MintForm";
import MarketplaceUploadForm from "./MarketplaceUploadForm";

export default function UploadedTab() {
    // Used to fetch the list of uploaded items from the server.
    const { isFetching, data, error } = useQuery({
        queryKey: ["uploadedNFTs"],
        queryFn: () => fetch("/api/traded").then(res => res.json()),
        refetchOnWindowFocus: false
    });

    return (
        <>
            <div className="grid gap-8 md:grid-cols-2">
                <MintForm />
                <MarketplaceUploadForm />
            </div>

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
                <div className="w-fit mx-auto mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        data.tradedItems.map((nft, index) => (
                            <UploadedNFTCard nft={nft} key={index} />
                        ))
                    }
                </div>
            }
        </>
    );
}

// Displays the information of an uploaded item.
function UploadedNFTCard({ nft }) {
    return (
        <Link to={`/marketplace/${nft.postingId}`}>
            <Card className="max-w-64 h-full">
                <CardImageAnimated imageSrc={"http://localhost:8000/uploads/" + nft.splashImage} alt={`Splash image of ${nft.name}.`} />

                <CardBody>
                    <CardTitle text={nft.name} />
                    <CardSubtitle text={"Token ID: " + nft.tokenId} />

                    <p className="text-sm mt-2">
                        {nft.type} NFT from collection <strong>{nft.collection}</strong>.
                    </p>

                    <p className="font-bold my-4">
                        Price: 
                        <span className="ml-1 text-xl">DRP {nft.price}</span>
                    </p>

                    <p className={`text-xl font-bold ${nft.isTraded ? "text-green-300" : "text-red-300"}`}>
                        {nft.isTraded ? "SOLD" : "NOT SOLD"}
                    </p>
                </CardBody>

                <CardFooter>
                    <p className="text-sm">
                        Posted on {new Date(nft.timePosted).toLocaleString()}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
}