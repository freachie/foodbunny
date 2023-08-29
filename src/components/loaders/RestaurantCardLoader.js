import "./RestaurantCardLoader.css";

const RestaurantCardLoader = () => (
	<>
		<div className="card">
			<div className="card__image"></div>
			<div className="card__content">
				<h2 className="loader-heading"></h2>
				<p className="loader-para"></p>
				<h2 className="loader-heading"></h2>
			</div>
		</div>
	</>
);

export default RestaurantCardLoader;