/** @format */

import "./ShowCartResetWarning.css";

const ShowCartResetWarning = ({
	setShowCartResetWarning,
	UpdateRestItemAndName,
}) => {
	return (
		<div className="cart-reset-wrapper">
			<div className="cart-reset-warning-details">
				<p className="cart-reset-warning-title">
					Few items already in cart from another restaurant
				</p>
				<p className="cart-reset-warning-description">
					You need to reset your cart for adding items from this restaurant.
					Would you like to continue ?
				</p>
				<div className="cart-reset-warning-buttons">
					<button
						className="cart-reset-warning-btn"
						onClick={() => {
							setShowCartResetWarning(false);
						}}>
						No
					</button>
					<button
						className="cart-reset-warning-btn"
						onClick={() => {
							UpdateRestItemAndName();
							setShowCartResetWarning(false);
						}}>
						Yes, Reset
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShowCartResetWarning;
