/*
    Name: Nguyen Quang Huy
    Student ID: 104169507
    Description: Source code for the marketplace page.
*/

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Gradient from "../components/Gradient";
import SearchBar from "../components/SearchBar";
import { SearchDropdown, SearchDropdownOption } from "../components/SearchDropdown";
import Pagination from "../components/Pagination";
import { Card, CardBody, CardTitle, CardSubtitle, CardFooter, CardImageAnimated } from "../components/Card";

export default function Marketplace() {
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [sort, setSort] = useState("");
    const [filter, setFilter] = useState("");
    const [queryParams, setQueryParams] = useState("");

    // Used to fetch the list of marketplace items from the server.
    const { isFetching: isFetchingPosting, data: postingData, error: postingError } = useQuery({
        queryKey: ["marketplace", page, queryParams],
        queryFn: () => fetch(`/api/marketplace?page=${page}&${queryParams}`).then(res => res.json()),
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });

    // Used to fetch the number of matching marketplace items from the server.
    const { isFetching: isFetchingCount, data: countData, error: countError } = useQuery({
        queryKey: ["marketplace", queryParams],
        queryFn: () => fetch(`/api/marketplaceCount?searchQuery=${searchText}&type=${filter}`).then(res => res.json()),
        refetchOnWindowFocus: false,
        refetchOnMount: true
    });

    // When the search button is clicked, updates the query parameters to fetch new data.
    function updateQueryParams() {
        setPage(1);

        const params = [];
        params.push(`searchQuery=${searchText}`);
        if (sort) {
            const [sortBy, sortOrder] = sort.split(" ");
            params.push(`sortBy=${sortBy}`, `sortOrder=${sortOrder}`);
        }
        if (filter) {
            params.push(`type=${filter}`);
        }
        if (params.length !== 0) {
            setQueryParams(params.join("&"));
        }
    }

    return (
        <div>
            {/* The page's title and search tools. */}
            <div className="max-w-5xl px-8 pt-12 mx-auto">
                <h1 className="font-display text-5xl text-center">Marketplace</h1>

                <p className="my-6 text-center text-xl">
                    Here you can find all the virtual fashion items you love.
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
                </p>

                <SearchBar searchText={searchText} setSearchText={setSearchText} />

                <div className="my-6 flex flex-wrap gap-6">
                    {/* Sort options. */}
                    <SearchDropdown name="sort" value={sort} setValue={setSort}>
                        <SearchDropdownOption value="">No sort</SearchDropdownOption>
                        <SearchDropdownOption value="price asc">Price (ascending)</SearchDropdownOption>
                        <SearchDropdownOption value="price desc">Price (descending)</SearchDropdownOption>
                        <SearchDropdownOption value="timePosted asc">Time posted (ascending)</SearchDropdownOption>
                        <SearchDropdownOption value="timePosted desc">Time posted (descending)</SearchDropdownOption>
                    </SearchDropdown>

                    {/* Filter options. */}
                    <SearchDropdown name="filter" value={filter} setValue={setFilter}>
                        <SearchDropdownOption value="">No filter</SearchDropdownOption>
                        <SearchDropdownOption value="Clothing">Clothing</SearchDropdownOption>
                        <SearchDropdownOption value="Accessories">Accessories</SearchDropdownOption>
                        <SearchDropdownOption value="Footwear">Footwear</SearchDropdownOption>
                        <SearchDropdownOption value="Hairstyles">Hairstyles</SearchDropdownOption>
                        <SearchDropdownOption value="Makeup">Makeup</SearchDropdownOption>
                        <SearchDropdownOption value="Body Modifications">Body Modifications</SearchDropdownOption>
                    </SearchDropdown>

                    <GradientButton onClick={updateQueryParams} className="ml-auto">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 mr-2" />
                        Search
                    </GradientButton>

                </div>

                <div className="my-6 flex flex-wrap gap-6 items-center">
                    <p className="font-bold">Showing {countData ? countData.count : 0} item(s) total.</p>
                    <Pagination page={page} setPage={setPage} maxPage={countData ? Math.ceil(countData.count / 20) : 1} className="ml-auto" />
                </div>

            </div>

            {/* The list of items on the market. */}
            {
                (isFetchingPosting || isFetchingCount) &&
                <p className="font-bold max-w-6xl px-8 mx-auto">Loading...</p>
            }

            {
                (postingError || countError) &&
                <p className="font-bold max-w-6xl px-8 mx-auto">An error happened. Please try again later.</p>
            }

            {
                postingData &&
                <div className="max-w-6xl w-fit px-8 py-12 mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        postingData.items.map((nft, index) =>
                            <MarketplaceCard nft={nft} key={index} />
                        )
                    }
                </div>
            }
        </div>
    );
}

// Button component with a gradient.
function GradientButton({ onClick, className, children }) {
    return (
        <Gradient className={className} gradientDirection="r">
            <button onClick={onClick} className="block h-full px-2 py-1 rounded-2xl bg-transparent font-bold focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-pink">
                {children}
            </button>
        </Gradient>
    );
}

// Displays information of an item on the marketplace.
function MarketplaceCard({ nft }) {
    return (
        <Link to={`/marketplace/${nft.postingId}`}>
            <Card className="max-w-64 h-full">
                <CardImageAnimated imageSrc={`http://localhost:8000/uploads/${nft.splashImage}`} alt={`Splash image for NFT ${nft.name}`}/>

                <CardBody>
                    <CardTitle text={nft.name} />
                    <CardSubtitle text={`from @${nft.username}`} />

                    <p className="text-sm mt-2">
                        {nft.type} NFT from collection <strong>{nft.collection}</strong>.
                    </p>

                    <p className="font-bold mt-2">
                        Price: 
                        <span className="ml-1 text-xl">DRP {nft.price}</span>
                    </p>
                </CardBody>

                <CardFooter>
                    <p className="text-xs">
                        Posted on {new Date(nft.timePosted).toLocaleString()}
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
}
