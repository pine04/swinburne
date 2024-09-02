/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: Defines the main application and the associated routes.
*/

import { 
	Route, 
	RouterProvider, 
	createBrowserRouter, 
	createRoutesFromElements 
} from "react-router-dom";

import Root from "./routes/Root";
import Homepage from "./routes/Homepage";
import Marketplace from "./routes/Marketplace";
import Item from "./routes/Item";
import Profile from "./routes/Profile";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<Homepage />} />
			<Route path="marketplace" element={<Marketplace />} />
			<Route path="items/:id" element={<Item />} />
			<Route path="profile" element={<Profile />} />
			<Route path="signup" element={<Signup />} />
			<Route path="login" element={<Login />} />
		</Route>
	)
);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
