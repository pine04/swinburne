import Gradient from "./Gradient";

const user = {
    accountId: "981zleGITVfnlwFn7u8J",
    bannerPictureURL: "/user_profile.jpg",
    profilePictureURL: "/user_profile.jpg",
    displayName: "The Trader",
    username: "TheNFTTrader",
    joinedDate: "01/01/2024",
    profileDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    balance: 500,
    itemsCollected: 100,
    itemsSold: 100
}

export default function User() {
    return (
        <Gradient>

            <div className="h-80 relative">
                <img 
                    src={user.bannerPictureURL}
                    alt="User banner picture."
                    className="w-full h-full rounded-t-2xl object-cover" 
                />
                <img 
                    src={user.profilePictureURL}
                    alt="User profile picture."
                    className="w-32 h-32 rounded-full border-4 border-pink 
                               absolute bottom-4 left-8 object-cover" 
                />
            </div>

            <div className="p-8 sm:flex sm:justify-between sm:items-center 
                            sm:gap-8">

                <div className="max-w-3xl flex flex-col gap-4 flex-shrink">
                    <p className="font-bold text-3xl">
                        {user.displayName}
                    </p>
                    <p>
                        @{user.username}
                    </p>
                    <p className="text-sm">
                        joined {user.joinedDate}
                    </p>
                    <p>
                        {user.profileDescription}
                    </p>
                </div>

                <div className="mt-8 sm:mt-0 flex flex-col gap-4 flex-shrink-0">
                    <p className="sm:text-right">
                        Balance
                        <span className="font-bold text-2xl ml-1">
                            {user.balance} DRP
                        </span>
                    </p>
                    <p className="sm:text-right">
                        Items collected
                        <span className="font-bold text-2xl ml-1">
                            {user.itemsCollected}
                        </span>
                    </p>
                    <p className="sm:text-right">
                        Items sold
                        <span className="font-bold text-2xl ml-1">
                            {user.itemsSold}
                        </span>
                    </p>
                </div>

            </div>

        </Gradient>
    );
}
