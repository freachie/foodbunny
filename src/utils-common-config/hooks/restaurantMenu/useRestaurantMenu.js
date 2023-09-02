/** @format */

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CORS_PROXY, RESTAURANT_MENU_API } from "../../constants";
import AppContext from "../../context/AppContext";
import { useDispatch } from "react-redux";
import { updateCurrentRest } from "../../store/slices/cartSlice";

const useRestaurantMenu = () => {
	const [totalMenuList, setTotalMenuList] = useState([]);
	const [veg, setVeg] = useState([]);
	const [nonVeg, setNonVeg] = useState([]);
	const { location } = useContext(AppContext);
	const { restId } = useParams();
	const vegList = [],
		nonVegList = [],
		totalMenu = [];

	const dispatch = useDispatch();

	useEffect(() => {
		if (location && location?.lat && location?.long) getMenu();
	}, [location]);

	const getMenu = async () => {
		const url = RESTAURANT_MENU_API.replace("LATITUDE", location.lat)
			.replace("LONGITUDE", location.long)
			.replace("RESTAURANT_ID", restId);
		try {
			const res = await fetch(CORS_PROXY + url);
			const menu = await res.json();
			const cards = await menu?.data?.cards;
			const info = cards[0]?.card?.card?.info;
			const {
				id,
				locality,
				city,
				areaName,
				avgRatingString,
				totalRatingsString,
				costForTwoMessage,
				feeDetails,
				logo,
				name,
				sla,
			} = info;
			dispatch(
				updateCurrentRest({
					id,
					locality,
					city,
					areaName,
					avgRatingString,
					totalRatingsString,
					costForTwoMessage,
					feeDetails,
					logo,
					name,
					sla,
				})
			);

			menu?.data?.cards?.forEach((card) => {
				const list = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
				if (list?.length) {
					list?.forEach((menu_list) => {
						if (menu_list?.card?.card?.itemCards?.length) {
							totalMenu[menu_list?.card?.card?.title] =
								menu_list?.card?.card?.itemCards;
						}
					});
				}
			});

			for (let menuType in totalMenu) {
				vegList[menuType] = [];
				nonVegList[menuType] = [];
				totalMenu[menuType]?.forEach((item) => {
					if (item?.card?.info?.isVeg) {
						vegList[menuType].push(item);
					} else {
						nonVegList[menuType].push(item);
					}
				});
			}

			setTotalMenuList(totalMenu);
			setVeg(vegList);
			setNonVeg(nonVegList);
		} catch (err) {
			console.log(err);
		}
	};

	return { totalMenuList, veg, nonVeg };
};

export default useRestaurantMenu;
