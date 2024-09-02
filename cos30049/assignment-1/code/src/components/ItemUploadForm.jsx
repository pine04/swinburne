import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import Gradient from "./Gradient";
import Button from "./Button";

export default function ItemUploadForm() {
    const [collapsed, setCollapsed] = useState(true);

    function toggleCollapse(e) {
        e.preventDefault();
        setCollapsed(!collapsed);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Gradient>
            <form method="POST" onSubmit={handleSubmit} className="p-4">

                <button 
                    onClick={toggleCollapse} 
                    className="w-full flex justify-between items-center text-xl"
                >
                    <h2 className="text-2xl font-bold">
                        Upload an item
                    </h2>

                    <FontAwesomeIcon 
                        icon={collapsed ? faAngleDown : faAngleUp} 
                    />
                </button>


                <div className={`mt-2 flex flex-col gap-4 ${collapsed ? "hidden"
                                 : "static"}`}>

                    <label className="flex flex-col gap-1 font-bold">
                        Item name: 
                        <input 
                            type="text" 
                            name="name" 
                            className="px-2 py-1 border-2 border-pink 
                                       rounded-2xl font-normal bg-pink/20 
                                       outline-none focus:outline-2 
                                       focus:outline-offset-2 
                                       focus:outline-pink"
                        />
                    </label>

                    <label className="flex flex-col gap-1 font-bold">
                        Price:
                        <input 
                            type="number" 
                            name="price" 
                            className="px-2 py-1 border-2 border-pink 
                                       rounded-2xl font-normal bg-pink/20 
                                       outline-none focus:outline-2 
                                       focus:outline-offset-2 
                                       focus:outline-pink"
                        />
                    </label>

                    <label className="flex flex-col gap-1 font-bold">
                        Item description: 
                        <textarea 
                            name="description" 
                            className="px-2 py-1 border-2 border-pink 
                                       rounded-2xl font-normal bg-pink/20 
                                       outline-none focus:outline-2 
                                       focus:outline-offset-2 
                                       focus:outline-pink"></textarea>
                    </label>

                    <label className="flex flex-col gap-1 font-bold">
                        Image: 
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*"
                            className="px-2 py-1 border-2 border-pink 
                                       rounded-2xl font-normal bg-pink/20 
                                       outline-none focus:outline-2 
                                       focus:outline-offset-2 
                                       focus:outline-pink"
                        />
                    </label>

                    <Button>Confirm</Button>

                </div>

            </form>
        </Gradient>
    );
}