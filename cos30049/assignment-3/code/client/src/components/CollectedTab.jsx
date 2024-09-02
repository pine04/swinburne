/*
    Name #1: Vu Xuan Sang
    Student ID #1: 104180388

    Name #2: Ta Quang Tung
    Student ID #2: 104222196

    Description: The CollectedTab component displays a list of NFTs the user owns.
*/
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardImageAnimated } from "./Card";

export default function CollectedTab() {
    // Used to fetch owned NFT data from the server.
    const { isFetching, data, error } = useQuery({
        queryKey: ["collected"],
        queryFn: () => fetch("/api/collected").then(res => res.json()),
        refetchOnWindowFocus: false
    });

    if (isFetching) {
        return <p className="my-8 font-bold text-2xl">Loading...</p>;
    }

    if (error) {
        return <p className="my-8 font-bold text-2xl">An error happened when trying to load your collection.</p>
    }

    if (data.assets.length === 0) {
        return <p className="my-8 font-bold text-2xl">You do not own any NFTs.</p>;
    }

    return (
        <>
            <p className="my-8 font-bold text-2xl">You have {data.assets.length} NFT(s) in your collection.</p>

            <div className="w-fit mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {
                    data.assets.map((nft, index) => (
                        <CollectedNFTCard nft={nft} key={index} />
                    ))
                }
            </div>
        </>
    );
}

// Displays information about one NFT.
function CollectedNFTCard({ nft }) {
    return (
        <Link to={`/profile/nfts/${nft.tokenId}`}>
            <Card className="max-w-64 h-full">
                <CardImageAnimated 
                    imageSrc={"http://localhost:8000/uploads/" + nft.splashImage} 
                    alt={`Splash image of ${nft.name}.`} 
                />

                <CardBody>
                    <CardTitle text={nft.name} />
                    <CardSubtitle text={"Token ID: " + nft.tokenId} />

                    <p className="text-sm mt-2">
                        {nft.type} NFT from collection <strong>{nft.collection}</strong>.
                    </p>
                </CardBody>

                <CardFooter>
                    <p className="text-sm">
                        Minted on {new Date(nft.timeMinted).toLocaleString()}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
}