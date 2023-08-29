import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';
import EmptyCart from '../EmptyCart/EmptyCart';
import { clearCart, updateRestId } from '../../utils-common-config/store/slices/cartSlice';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignInWithPhone from "../SignInWithPhone/SignInWithPhone";
import SignInWithEmail from '../SignInWithEmail/SignInWithEmail';

const Cart = () => {
	const [showUserSignInPhone, setShowUserSignInPhone] = useState(false);
	const [showUserSignInEmail, setShowUserSignInEmail] = useState(false);
	let totalCost = 0, platformFee = 200, cartItems = [];
	const items = useSelector((store) => store.cart.items);
	const restInfo = useSelector((store) => store.cart.addedRestaurant);
	const totalItems = useSelector((store) => store.cart.totalItems);
	const isUserLoggedIn = useSelector((store) => store.user.isUserLoggedIn);
	const dispatch = useDispatch();

	const confirmOrder = () => { 
		dispatch(updateRestId(0));
		dispatch(clearCart());
	};

	if (!totalItems) {
		return <EmptyCart />;
	}

	const {
		deliveryTime,
		maxDeliveryTime,
		minDeliveryTime,
		lastMileTravelString,
	} = restInfo?.sla;
	for (let item in items) {
		cartItems.push(items[item]);
		totalCost += items[item].price * items[item].count;
	}

	const formattedTotalPrice = (cost) => new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(cost / 100);

  return (
		<div className="cart-wrapper">
			{showUserSignInPhone && !isUserLoggedIn ? (
				<SignInWithPhone
					setShowUserSignInPhone={setShowUserSignInPhone}
					showCloseButton={true}
				/>
			) : null}
			{showUserSignInEmail && !isUserLoggedIn ? (
				<SignInWithEmail
					setShowUserSignInEmail={setShowUserSignInEmail}
					showCloseButton={true}
				/>
			) : null}
			{isUserLoggedIn ? (
				<div className="address-and-payment-wrapper">
					<div className="delivery-address">
						<p className="delivery-address-title">Delivery Address</p>
						<p className="delivery-address-name">Home</p>
						<p className="delivery-address-desc">
							I-1602, Tower I, Ajnara le garden, Sector 16B, Greater Noida West,
							Uttar Pradesh 201304, India
						</p>
						<p className="delivery-address-time">
							{deliveryTime ?? minDeliveryTime ?? maxDeliveryTime}
							{" mins "}
							{lastMileTravelString ? ` for ${lastMileTravelString}` : null}
						</p>
					</div>
					<div className="payment-method">
						<p>Choose payment method</p>
						<Link to="/foodbunny/order">
							<button
								className="proceed-to-pay"
								onClick={() => {
									confirmOrder();
								}}>
								Confirm Order
							</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="cart-user-signin">
					<h1 className="cart-sign-in-account-heading">Account</h1>
					<p className="cart-sign-in-description">
						You need to login to place your order and to enjoy exciting rewards.
					</p>
					<button
						className="cart-sign-in"
						onClick={() => {
							setShowUserSignInPhone(true);
						}}>
						<p className="cart-sign-in-title">Log In</p>
						<p className="cart-sign-in-type">Using Phone Number</p>
					</button>
					<button
						className="cart-sign-in"
						onClick={() => {
							setShowUserSignInEmail(true);
						}}>
						<p className="cart-sign-in-title">Log In</p>
						<p className="cart-sign-in-type">Using email id</p>
					</button>
				</div>
			)}
			<div className="cart-info">
				<p className="cart-info-rest-info">{restInfo?.name}</p>
				<hr className="cart-info-rest-seperator" />
				<div className="cart-info-items-info">
					{cartItems.map((item) => (
						<CartItem key={item.id} item={item} />
					))}
				</div>
				<div className="cart-info-bill-info">
					<p className="cart-info-bill-info-title">Bill details</p>
					<div className="cart-info-bill-info-total">
						<p>Item Total</p>
						<p>{formattedTotalPrice(totalCost)}</p>
					</div>
					<hr className="cart-info-bill-seperator" />
					<div className="cart-info-bill-info-delivery-fee">
						<p>Delivery Fee*</p>
						<p>{formattedTotalPrice(restInfo.feeDetails.totalFee ?? 3000)}</p>
					</div>
					<hr className="cart-info-bill-seperator" />
					<div className="cart-info-bill-info-platform-fee">
						<p>Platform Fee</p>
						<p>{formattedTotalPrice(platformFee)}</p>
					</div>
					<hr className="cart-info-bill-seperator" />
				</div>
				<div className="cart-info-to-pay">
					<p>TO PAY</p>
					<p>
						{formattedTotalPrice(
							totalCost + platformFee + (restInfo.feeDetails.totalFee ?? 3000)
						)}
					</p>
				</div>
			</div>
		</div>
	);

}

export default Cart;