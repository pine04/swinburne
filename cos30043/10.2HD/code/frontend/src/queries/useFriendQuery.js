import { useQuery } from "@tanstack/vue-query";

async function fetchFriends() {
    const response = await fetch("http://localhost:8000/friends");
    if (!response.ok) {
        throw new Error("Could not fetch data.");
    }
    const data = await response.json();
    return data.friends;
}

export default function useFriendQuery() {
    const queryResult = useQuery({
        queryKey: ["friends"],
        queryFn: fetchFriends,
        refetchOnWindowFocus: false
    });

    return queryResult;
}
