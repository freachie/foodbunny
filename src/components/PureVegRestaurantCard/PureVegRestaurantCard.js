
import './PureVegRestaurantCard.css';

const PureVegRestaurantCard = (RestaurantCard) => {
	return (restaurant) => {
		return (
				<div className="veg-restaurant-card">
					<p className="pure-veg-label">Pure Veg</p>
					<RestaurantCard details={restaurant.details} />
				</div>
		);
	};
};

export default PureVegRestaurantCard;