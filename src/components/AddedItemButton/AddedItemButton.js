/** @format */

import "./AddedItemButton.css";

const AddedItemButton = ({ count, RemoveFromCart, AddToCart }) => {
	return (
		<div className="added-item-button-wrapper">
			<button onClick={RemoveFromCart} className="added-item-button remove">
				-
			</button>
			<p style={{margin: 0}}>{count}</p>
			<button onClick={AddToCart} className="added-item-button add">
				+
			</button>
		</div>
	);
};

export default AddedItemButton;
