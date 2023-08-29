/** @format */

import { useEffect, useState } from "react";
import "./RestaurantMenu.css";
import { LOADER_COUNT } from "./../../utils-common-config/constants";
import MenuList from "../MenuList/MenuList";
import RestaurantMenuLoader from "../loaders/RestaurantMenuLoader";
import RestaurantInfo from "../RestaurantInfo/RestaurantInfo";
import useRestaurantMenu from "../../utils-common-config/hooks/restaurantMenu/useRestaurantMenu";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
	const [menuTypes, setMenuTypes] = useState([]);
	const [menuList, setMenuList] = useState([]);
	const [showMenuList, setShowMenuList] = useState(0);
	const { totalMenuList, veg, nonVeg } = useRestaurantMenu();

	const restInfo = useSelector((store) => store.cart.currentRest);

	useEffect(() => {
		const list = [];
		setMenuList(totalMenuList);
		for (let item in totalMenuList) {
			list.push(item);
			setMenuTypes(list);
		}
	}, [totalMenuList]);

	const filterMenuList = (type) => {
		const vegEl = document.getElementById("veg-filter");
		const nonVegEl = document.getElementById("nonVeg-filter");
		if (type == "veg" && vegEl.checked) {
			nonVegEl.checked = false;
			setMenuList(veg);
		} else if (type == "nonveg" && nonVegEl.checked) {
			vegEl.checked = false;
			setMenuList(nonVeg);
		} else {
			setMenuList(totalMenuList);
		}
	};

	if (!menuTypes?.length) {
		return (
			<div className="menu-loader">
				{LOADER_COUNT.map((item, index) => (
					<RestaurantMenuLoader key={index} />
				))}
			</div>
		);
	}

	return (
		<>
			<div className="menu">
				<RestaurantInfo info={restInfo} />
				<div className="veg-non-veg-filter">
					<p className="filter-label">Veg Only</p>
					<label className="switch">
						<input
							type="checkbox"
							id="veg-filter"
							onClick={() => {
								filterMenuList("veg");
							}}
						/>
						<span className="slider round veg"></span>
					</label>

					<p className="filter-label">Non-Veg Only</p>
					<label className="switch">
						<input
							type="checkbox"
							id="nonVeg-filter"
							onClick={() => {
								filterMenuList("nonveg");
							}}
						/>
						<span className="slider round non-veg"></span>
					</label>
				</div>
				{menuTypes?.map((menu, index) => (
					<MenuList
						key={index}
						menu={menuList[menu]}
						title={menu}
						showMenuList={index == showMenuList}
						setShowMenuList={() => {
							showMenuList != index
								? setShowMenuList(index)
								: setShowMenuList(null);
						}}
					/>
				))}
			</div>
		</>
	);
};

export default RestaurantMenu;
