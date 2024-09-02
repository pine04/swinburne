/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: Defines the main application and the associated routes.
*/

import { 
	Route, 
	RouterProvider, 
	createBrowserRouter, 
	createRoutesFromElements,
	Outlet
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./routes/Root";
import Homepage from "./routes/Homepage";
import Marketplace from "./routes/Marketplace";
import MarketplacePosting from "./routes/MarketplacePosting";
import Profile from "./routes/Profile";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import AuthContextProvider from "./contexts/AuthContext";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import NFTInfo from "./routes/NFTInfo";
import Purchase from "./routes/Purchase";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<Homepage />} />

			<Route path="marketplace" element={<Outlet />}>
				<Route index element={<Marketplace />} />
				<Route path=":id" element={<MarketplacePosting />} />
			</Route>

			<Route path="profile"
				element={
					<PrivateRoute>
						<Outlet />
					</PrivateRoute>
				} 
			>
				<Route index element={<Profile />}/>
				<Route path="nfts/:id" element={<NFTInfo />} />
			</Route>

			<Route path="purchase/:postingId"
				element={
					<PrivateRoute>
						<Purchase />
					</PrivateRoute>
				} 
			/>

			<Route 
				path="signup" 
				element={
					<UnauthenticatedRoute>
						<Signup />
					</UnauthenticatedRoute>
				} 
			/>
			
			<Route 
				path="login" 
				element={
					<UnauthenticatedRoute>
						<Login />
					</UnauthenticatedRoute>
				} 
			/>
		</Route>
	)
);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<RouterProvider router={router} />
			</AuthContextProvider>
		</QueryClientProvider>
	);
}

export default App;
