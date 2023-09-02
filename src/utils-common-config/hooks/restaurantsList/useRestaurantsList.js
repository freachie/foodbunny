/** @format */

import { useContext, useEffect, useState } from "react";
import { CORS_PROXY, RESTAURANTS_LIST_API } from '../../constants';
import AppContext from "../../context/AppContext";

const useRestaurantsList = () => {
  const [list, setList] = useState([]);
  const [restListId, setRestListId] = useState("");
	const restList = [], set = new Set();
	const { location } = useContext(AppContext);
  
	useEffect(() => {
		if(location?.lat && location?.long ) getRestaurantList();
	}, [location]);

  const getRestaurantList = async () => {
		const url = RESTAURANTS_LIST_API.replace("LATITUDE", location.lat).replace(
			"LONGITUDE",
			location.long
		);
		try { 
			const res = await fetch(CORS_PROXY + url);
			const restData = await res.json();
			const cards = await restData?.data?.cards;
			const responseId = cards[0]?.card?.card?.id;
			cards?.forEach((rest) => {
				const restaurants =
					rest?.card?.card?.gridElements?.infoWithStyle?.restaurants;
				if (restaurants?.length) {
					restaurants.forEach((rest) => {
						if (!set.has(rest?.info?.id)) {
							restList.push(rest?.info);
							set.add(rest?.info?.id);
						}
					});
				}
			});
			setRestListId(responseId);
			setList(restList);
		}
		catch (err) {
			console.log(err)
		}
		
	};

  return [list, restListId];
}

export default useRestaurantsList;
