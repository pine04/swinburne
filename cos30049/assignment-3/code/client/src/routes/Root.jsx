/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The Root component corresponds to the Root route of the app.
*/

import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
	return (
		<div className="h-dvh grid grid-rows-[auto,1fr,auto]">
			{/* Decorative blur circle at the top left corner of each page. */}
			<div className="w-64 h-64 rounded-full absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 -z-10 bg-pink blur-[128px]"></div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}