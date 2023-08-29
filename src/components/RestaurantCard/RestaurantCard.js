/** @format */

import { Link } from "react-router-dom";
import "./RestaurantCard.css";
import { RESTAURANT_PIC_URL } from "../../utils-common-config/constants/constants";
const starLogo = require("../../assets/logos/star.png");

const RestaurantCard = (restaurant) => {
	const {
		id,
		aggregatedDiscountInfoV3,
		cloudinaryImageId,
		name,
		avgRating,
		cuisines,
		locality,
		areaName,
		city,
	} = restaurant.details;

	const formattedAddress = () => {
		const firstLine = locality ?? city ?? null;
		return firstLine ? [firstLine, areaName].join(',') : areaName;
	};

	const formattedDiscountTag = () => {
		let header = '';
		if (aggregatedDiscountInfoV3) {
			header += aggregatedDiscountInfoV3?.header ? aggregatedDiscountInfoV3?.header : '';
			header += " ";
			header += aggregatedDiscountInfoV3?.subHeader ? aggregatedDiscountInfoV3?.subHeader : '';
		}
		return header;
	}
	
	return (
		<>
			<div className="restaurant-card">
				<Link
					to={"/foodbunny/restaurants/" + id}
					className="rest-link"
					preventScrollReset={true}>
					<div className="rest-header">
						<img
							src={RESTAURANT_PIC_URL + cloudinaryImageId}
							alt="placeholder"
							className="rest-logo"
						/>
						{aggregatedDiscountInfoV3?.header && (
							<p className="discount">{formattedDiscountTag()}</p>
						)}
					</div>
					<div className="rest-details">
						<p className="rest-name">{name} </p>
						<div className="rating-container">
							<img
								src={starLogo}
								alt="placeholder"
								style={{ height: "20px" }}
							/>
							<p className="rating">{avgRating}</p>
						</div>
						<p className="rest-cuisine-address">{cuisines.join(",")}</p>
						<p className="rest-cuisine-address">{formattedAddress()}</p>
					</div>
				</Link>
			</div>
		</>
	);
};

export default RestaurantCard;
