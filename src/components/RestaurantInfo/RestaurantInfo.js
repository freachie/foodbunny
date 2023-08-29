import "./RestaurantInfo.css";
import star from '../../assets/logos/star2.png';

const RestaurantInfo = (rest) => {
	const { locality, city, areaName } = rest?.info;

	const formattedAddress = () => {
		const firstLine = locality ?? city ?? null;
		return firstLine ? [firstLine, areaName].join(",") : areaName;
	};

  return (
		<div className="rest-info-wrapper">
			<div className="rest-info-details">
				<div className="rest-info-name-location">
					<div className="rest-info-name">{rest?.info?.name}</div>
					<div className="rest-info-location">{formattedAddress()}</div>
				</div>
				<div className="rest-info-ratings-info">
					<div className="rest-info-rating">
						<img src={star} className="rest-info-rating-star" />
						<p className="rest-info-avgRating">{rest?.info?.avgRatingString}</p>
					</div>
					<hr />
					<p className="rest-info-rating-count">
						{rest?.info?.totalRatingsString}
					</p>
				</div>
			</div>
			<div className="rest-info-cost">{rest?.info?.costForTwoMessage}</div>
			<hr className="rest-info-seperator" />
		</div>
	);
}

export default RestaurantInfo;