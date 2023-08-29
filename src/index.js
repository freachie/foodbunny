/** @format */

import React, { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RouteError from "./components/Error/RouteError";
import About from "./components/About/About";
import RestaurantMenu from "./components/RestaurantMenu/RestaurantMenu";
import OfflineCard from "./components/OfflineCard/OfflineCard";
import AppContext from "./utils-common-config/context/AppContext";
import useLocation from "./utils-common-config/hooks/location/useLocation";
import Cart from "./components/Cart/Cart";
import appStore from "./utils-common-config/store/appStore";
import OrderComplete from "./components/OrderComplete/OrderComplete";
import reportWebVitals from "./reportWebVitals";
import UserDetails from "./components/UserDetails/UserDetails";
import SignInWithEmail from "./components/SignInWithEmail/SignInWithEmail";
import ContactUs from "./components/ContactUs/ContactUs";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
	const [lat, long, name] = useLocation();
	const [location, setLocation] = useState({});

	useEffect(() => {
		setLocation({ lat: lat, long: long, areaName: name });
	}, [lat, long, name]);

	return (
		<StrictMode>
			<Provider store={appStore}>
				<AppContext.Provider
					value={{
						location,
						setLocation,
					}}>
					<Header />
					<OfflineCard />
					<Outlet />
				</AppContext.Provider>
			</Provider>
		</StrictMode>
	);
};

const routeConfig = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <RouteError />,
		children: [
			{
				path: "/foodbunny",
				element: <RestaurantList />,
			},
			{
				path: "/foodbunny/about",
				element: <About />,
			},
			{
				path: "/foodbunny/cart",
				element: <Cart />,
			},
			{
				path: "/foodbunny/order",
				element: <OrderComplete />,
			},
			{
				path: "/foodbunny/contact-us",
				element: <ContactUs />,
			},
			{
				path: "/foodbunny/signin",
				element: <SignInWithEmail />,
			},
			{
				path: "/foodbunny/restaurants/:restId",
				element: <RestaurantMenu />,
			},
			{
				path: "/foodbunny/user-details",
				element: <UserDetails />,
			},
		],
	},
]);

root.render(<RouterProvider router={routeConfig} />);

reportWebVitals();
