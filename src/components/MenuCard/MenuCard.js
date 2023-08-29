/** @format */
import "./MenuCard.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
	MENU_ITEM_PIC,
	ADD_BUTTON_TEXT,
} from "../../utils-common-config/constants/constants";
import vegLogo from "../../assets/logos/veg.png";
import nonVegLogo from "../../assets/logos/non-veg.png";
import AddedItemButton from "../AddedItemButton/AddedItemButton";
import { addToCart, clearCart, removeFromCart, updateAddedRestaurant, updateRestId } from "../../utils-common-config/store/slices/cartSlice";
import ShowCartResetWarning from '../ShowCartResetWarning/ShowCartResetWarning';

const MenuCard = ({ menu }) => {
	const [addedItemCount, setAddedItemCount] = useState(0);
	const [showCartResetWarning, setShowCartResetWarning] = useState(false);

	const currentRestInfo = useSelector((store) => store.cart.currentRest);
	const addedRestId = useSelector((store) => store.cart.restId);

	const item = menu ?? {}, currentRestaurantId = currentRestInfo.id;
	const dispatch = useDispatch();

	const formattedPrice = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(item?.price / 100 || item?.defaultPrice / 100);

	const cartItem = {
		name: item?.name,
		price: item?.price ?? item?.defaultPrice,
		isVeg: item?.isVeg,
		id: item?.id,
		count: 1,
	};

	const UpdateRestItemAndName = () => {
		dispatch(clearCart());
		dispatch(addToCart(cartItem));
		dispatch(updateAddedRestaurant(currentRestInfo));
		dispatch(updateRestId(currentRestInfo.id));
		setAddedItemCount(addedItemCount + 1);
	};

	const addSameRestItem = () => {
		dispatch(addToCart(cartItem));
		setAddedItemCount(addedItemCount + 1);
	};

	const AddToCart = () => {
		if (!addedRestId) {
			UpdateRestItemAndName();
		} else if (currentRestaurantId !== addedRestId) {
			//TODO: We will show overlay to discard already added items as it's a new restaurant
			setShowCartResetWarning(true);
		} else {
			addSameRestItem();
		}
	};

	const RemoveFromCart = () => {
		dispatch(removeFromCart(cartItem));
		setAddedItemCount(addedItemCount - 1);
	};

	return (
		<div className="menu-card-wrapper">
			{showCartResetWarning ? (
				<ShowCartResetWarning
					setShowCartResetWarning={setShowCartResetWarning}
					UpdateRestItemAndName={UpdateRestItemAndName}
				/>
			) : null}
			<div className="item-details">
				<img
					src={item?.isVeg ? vegLogo : nonVegLogo}
					alt="veg non-veg logo"
					className="veg-non-veg-logo"
				/>
				<p className="name">{item?.name}</p>
				<p className="price">{formattedPrice}</p>
				<p className="description">{item?.description}</p>
			</div>
			<div className="cart">
				{item?.imageId ? (
					<img
						src={MENU_ITEM_PIC + item?.imageId}
						alt="item-pic"
						className="pic"
					/>
				) : null}
				{!addedItemCount ? (
					<button
						className="add-btn"
						onClick={() => {
							AddToCart();
						}}>
						{ADD_BUTTON_TEXT}
					</button>
				) : (
					<AddedItemButton
						count={addedItemCount}
						RemoveFromCart={RemoveFromCart}
						AddToCart={AddToCart}
					/>
				)}
			</div>
		</div>
	);
};

export default MenuCard;
