import { Link } from "react-router-dom";

import Button from "../components/Button";
import Gradient from "../components/Gradient";

export default function Signup() {
    return (
        <div className="px-8 py-12 overflow-x-clip">
            <h1 className="text-5xl font-display text-center">Sign up</h1>

            <p className="my-6 text-center">
                Begin your dripped journey on the Metaverse today!
            </p>

            <Gradient className="p-4 max-w-md mx-auto relative">
                {/* Blur circle at the top left corner of the image. */}
                <div className="w-64 h-64 rounded-full absolute left-0 top-0
                                    -translate-x-1/2 -translate-y-1/2 -z-10 
                                    bg-pink blur-[128px]"></div>

                {/* Blur circle at the bottom right corner of the image. */}
                <div className="w-48 h-48 rounded-full absolute left-full 
                                top-full -translate-x-1/2 -translate-y-1/2 
                                -z-10 bg-purple blur-[96px]"></div>

                <form className="p-4 flex gap-4 flex-col">
                    <label className="flex flex-col gap-1 font-bold">
                        Email: 
                        <input 
                            type="email" 
                            name="email" 
                            className="px-2 py-1 border-2 border-pink 
                                        rounded-2xl font-normal bg-pink/20 
                                        outline-none focus:outline-2 
                                        focus:outline-offset-2 
                                        focus:outline-pink"
                        />
                    </label>

                    <label className="flex flex-col gap-1 font-bold">
                        Password: 
                        <input 
                            type="password" 
                            name="password" 
                            className="px-2 py-1 border-2 border-pink 
                                        rounded-2xl font-normal bg-pink/20 
                                        outline-none focus:outline-2 
                                        focus:outline-offset-2 
                                        focus:outline-pink"
                        />
                    </label>

                    <label className="flex flex-col gap-1 font-bold">
                        Confirm password: 
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            className="px-2 py-1 border-2 border-pink 
                                        rounded-2xl font-normal bg-pink/20 
                                        outline-none focus:outline-2 
                                        focus:outline-offset-2 
                                        focus:outline-pink"
                        />
                    </label>

                    <p className="text-center">
                        Already have an account?
                        <Link 
                            to="/login" 
                            className="ml-1 underline hover:text-pink 
                                       transition-colors"
                        >
                            Login
                        </Link>.
                    </p>

                    <Button className="mx-auto">Sign up</Button>
                </form>
            </Gradient>
        </div>
    )
}