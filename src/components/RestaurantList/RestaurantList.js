/** @format */

import "./RestaurantList.css";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { useEffect, useState } from "react";
import {
	LOADER_COUNT,
	TOP_RATED_BUTTON,
	RESTAURANTS_LIST_API,
	ALL_RESTAURANTS_BUTTON,
	TOP_RATED_AVG_RATING,
	LOCATION_NOT_SERVICABLE,
} from "../../utils-common-config/constants";
import RestaurantCardLoader from '../loaders/RestaurantCardLoader';
import useRestaurantsList from '../../utils-common-config/hooks/restaurantsList/useRestaurantsList';
import PureVegRestaurantCard from "../PureVegRestaurantCard/PureVegRestaurantCard";
import LocationUnserviceable from '../LocationUnserviceable/LocationUnserviceable';

const RestaurantList = () => {
	const [restaurantList, setRestaurantList] = useState([]);
	const [restaurantSearchText, setRrestaurantSearchText] = useState("");
	const [totalRestaurants, setTotalRestaurants] = useState([]);
	const [topRatedSelected, setTopRatedSelected] = useState(false);
	const [filterButtonText, setFilterButtonText] = useState(TOP_RATED_BUTTON);

	const [restList, restListId] = useRestaurantsList(RESTAURANTS_LIST_API);
	const VegRestaurant = PureVegRestaurantCard(RestaurantCard);

	useEffect(() => {
		setRestaurantList(restList);
		setTotalRestaurants(restList);
	}, [restList]);

	const getSearchedRestaurants = (text) => {
		setRrestaurantSearchText(text);
		const searchedRest = totalRestaurants.filter((rest) =>
			rest.name.toLowerCase().includes(text.toLowerCase())
		);
		if (searchedRest?.length) setRestaurantList(searchedRest);
	};

	const filterTopRated = (restaurantList) => {
		let filteredList = [];
		if (!topRatedSelected) {
			filteredList = restaurantList?.filter(
				(rest) => rest.avgRating > TOP_RATED_AVG_RATING
			);
			setFilterButtonText(ALL_RESTAURANTS_BUTTON);
		} else {
			setFilterButtonText(TOP_RATED_BUTTON);
			filteredList = totalRestaurants;
		}
		setRestaurantList(filteredList);
		setTopRatedSelected(!topRatedSelected);
	};

	if (!restaurantList?.length && !restListId?.length) {
		return (
			<div className="main content">
				{LOADER_COUNT.map((item, index) => (
					<RestaurantCardLoader key={index} />
				))}
			</div>
		);
	}

	return (
		<>
			<div className="main">
				{ restListId.includes(LOCATION_NOT_SERVICABLE) ? 
				<LocationUnserviceable /> :
				<div className="restaurant-list">
					<div className="search-filter-button">
						<button
							className="top-rated"
							onClick={() => {
								filterTopRated(restaurantList);
							}}>
							{filterButtonText}
						</button>
						<input
							className="search-restaurant"
							type="text"
							value={restaurantSearchText}
							onChange={(event) => {
								getSearchedRestaurants(event.target.value);
							}}
							placeholder="Search Restaurant ..."
						/>
					</div>
					<div className="content">
							{restaurantList?.map((restaurant, index) =>
							restaurant?.veg ? (
								<VegRestaurant
									key={restaurant?.id ?? index}
									details={restaurant}
								/>
							) : (
								<RestaurantCard
									key={restaurant?.id ?? index}
									details={restaurant}
								/>
							)
						)}
					</div>
				</div>
				}
			</div>
		</>
	);
};

export default RestaurantList;
