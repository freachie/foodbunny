import "./CartItem.css";
import AddedItemButton from '../AddedItemButton/AddedItemButton';
import vegLogo from '../../assets/logos/veg.png';
import nonVegLogo from '../../assets/logos/non-veg.png';
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../utils-common-config/store/slices/cartSlice";

const CartItem = ({ item }) => {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(item.price * item.count / 100);
	
	const dispatch = useDispatch();

	const cartItem = {
		name: item?.name,
		price: item?.price ?? item?.defaultPrice,
		isVeg: item?.isVeg,
		id: item?.id,
		count: 1,
	};

	const AddToCart = () => {
		dispatch(addToCart(cartItem));
	};

	const RemoveFromCart = () => {
		dispatch(removeFromCart(cartItem));
	};


  return (
		<div className="cart-item-wrapper">
			<div className="cart-item-details">
				<img
					src={item?.isVeg ? vegLogo : nonVegLogo}
					className="cart-item-type"
					alt="veg-non-veg-logo"
				/>
				<p className="cart-item-name">{item?.name}</p>
			</div>
			<div className="cart-item-btn">
				<AddedItemButton
					count={item.count}
					RemoveFromCart={RemoveFromCart}
					AddToCart={AddToCart}
				/>
			</div>
			<div className="cart-item-price">{formattedPrice}</div>
		</div>
	);
}

export default CartItem;