import "./EmptyCart.css";
import cartLogo from '../../assets/logos/empty-cart.svg';
import { Link } from "react-router-dom";

const EmptyCart = () => {

  return (
		<div className="empty-cart-wrapper">
			<img src={cartLogo} alt="empty-cart logo" className="empty-cart-logo" />
			<div className="empty-cart-details">
				<p className="empty-cart-title">Your cart is empty</p>
				<p className="empty-cart-description">
					You can go to home page to view more restaurants
				</p>
			</div>
			<Link to="/foodbunny" className="empty-cart-rest-link">
				<button className="empty-cart-rest-button">
					CHECK NEAREST RESTAURANTS
				</button>
			</Link>
		</div>
	);
}

export default EmptyCart;