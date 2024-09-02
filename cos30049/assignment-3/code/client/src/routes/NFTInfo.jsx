/*
    Name: Tran Hoang Hai Anh
    Student ID: 104177513
    Description: Source code for the item showcase page.
*/

import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Gradient from "../components/Gradient";
import { Card, CardBody, CardTitle, CardSubtitle, CardImage } from "../components/Card";

export default function NFTInfo() {
    const { id } = useParams();
    
    // Used to fetch the item info from the server.
    const { isFetching, data, error } = useQuery({
        queryKey: ["nftInfo", id],
        queryFn: () => fetch(`/api/collected/${id}`).then(res => res.json()),
        refetchOnWindowFocus: false
    });

    return (
        <div>
            <div className="max-w-6xl px-8 mx-auto">
                <Link to="/profile" className="w-fit block relative after:w-full after:h-0.5 after:absolute after:left-0 after:top-full after:scale-x-0 after:origin-left after:bg-white after:transition-transform hover:after:scale-x-100">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-4"/>
                    Back to profile
                </Link>
            </div>

            {
                isFetching &&
                <p className="my-8 font-bold text-2xl">Loading...</p>
            }

            {
                error &&
                <p className="my-8 font-bold text-2xl">An error happened when trying to load this NFT.</p>
            }

            {
                data &&
                <article className="max-w-6xl px-8 py-12 mx-auto relative grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8">
                    <div className="w-fit h-fit mx-auto md:mx-0 md:sticky md:top-6">
                        <Card className="max-w-64">
                            
                            <CardImage imageSrc={`http://localhost:8000/uploads/${data.assetInfo.splashImage}`} />

                            <CardBody>
                                <CardTitle text={data.assetInfo.name} />
                                <CardSubtitle text={"Token ID: " + data.assetInfo.tokenId} />
                                <CardSubtitle text={`Time minted: ${new Date(data.assetInfo.timeMinted).toLocaleString()}`} />
                            </CardBody>

                        </Card>
                    </div>

                    <Gradient className="p-8">
                        <h1 className="my-4 text-2xl font-bold">{data.assetInfo.name}</h1>

                        <p className="my-2">
                            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                            This item is an NFT.
                        </p>

                        <h2 className="text-lg font-bold mt-4">Type</h2>
                        <p>{data.assetInfo.type}</p>

                        <h2 className="text-lg font-bold mt-4">Collection</h2>
                        <p>{data.assetInfo.collection}</p>

                        <h2 className="text-lg font-bold mt-4">Description</h2>
                        <p>{data.assetInfo.description}</p>
                    </Gradient>
                </article>
            }
        </div>
    );
}
