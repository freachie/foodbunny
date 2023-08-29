/** @format */

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	ContactUs_NavBar,
	SignIn_NavBar,
	Cart_NavBar,
	About_NavBar,
} from "../../utils-common-config/constants/constants";
import "./Header.css";
import Location from "../Location/Location";
import { updateUserDetails } from "../../utils-common-config/store/slices/userSlice";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../utils-common-config/firebase/firebase";

const logo = require("../../assets/logos/logo.jpg");
const phoneIcon = require("../../assets/logos/contact.png");
const aboutIcon = require("../../assets/logos/about.png");
const signinIcon = require("../../assets/logos/signin.png");
const cartIcon = require("../../assets/logos/cart.png");

const Header = () => {
	const dispatch = useDispatch();
	
	const cartItemCount = useSelector((store) => store.cart.totalItems);
	const isUserLoggedIn = useSelector((store) => store.user.isUserLoggedIn);
	const [itemCount, setItemCount] = useState(0);

	if (isSignInWithEmailLink(auth, window.location.href)) {
		let email = window.localStorage.getItem("emailForSignIn");
		// if (!email) {
		// 	email = window.prompt("Please provide your email for confirmation");
		// }
		signInWithEmailLink(auth, email, window.location.href)
			.then((result) => {
				console.log(result);
				window.localStorage.removeItem("emailForSignIn");

				const user = {
					phone: result?.user?.phoneNumber,
					name: result?.user?.displayName,
					email: result?.user?.email,
					isUserLoggedIn: true,
				};
				dispatch(updateUserDetails(user));
				// You can check if the user is new or existing:
				// result.additionalUserInfo.isNewUser
			})
			.catch((error) => {
				console.log(error)
			});
	}

	let user = useSelector((store) => store.user);
	user = !user.isUserLoggedIn ? JSON.parse(localStorage.getItem("user")) : user;

	const userName =
		(user?.name && user?.name !== "[DEFAULT]")
			? user?.name
			: user?.phone ?? user?.email.split("@")[0];

	useEffect(() => {
		setItemCount(cartItemCount);
	}, [cartItemCount]);

	useEffect(() => {
		dispatch(
			updateUserDetails({
				phone: user?.phone ?? null,
				name: user?.name ?? "",
				email: user?.email ?? "",
				isUserLoggedIn: user?.isUserLoggedIn ? true : false,
			})
		);
	}, [user]);

	return (
		<>
			<div className="header">
				<div className="search-container">
					<Link to="/foodbunny">
						<img className="logo" src={logo} alt="appLogo" />
					</Link>
					<Location />
				</div>
				<div className="nav-bars">
					<div className="nav-item">
						<img className="nav-images" src={phoneIcon} alt="contact-us" />
						<p style={{width:"82px"}}>
							<Link to="/foodbunny/contact-us" className="nav-links">
								{ContactUs_NavBar}
							</Link>
						</p>
					</div>
					<div className="nav-item">
						<img className="nav-images" src={aboutIcon} alt="help" />
						<p>
							<Link to="/foodbunny/about" className="nav-links">
								{About_NavBar}
							</Link>
						</p>
					</div>
					<div className="nav-item">
						<img className="nav-images" src={signinIcon} alt="sign in" />
						<p className="sign-in">
							{!isUserLoggedIn ? (
								<Link to="/foodbunny/signin" className="nav-links">
									{SignIn_NavBar}
								</Link>
							) : (
								<Link to="/foodbunny/user-details" className="nav-links">
									<span>{"Hi, " + userName}</span>
								</Link>
							)}
						</p>
					</div>
					<div className="nav-item">
						<img className="nav-images" src={cartIcon} alt="cart" />
						<Link to="/foodbunny/cart" className="nav-links">
							<p>{Cart_NavBar}</p>
							{itemCount ? (
								<p className="cart-item-count">{itemCount}</p>
							) : null}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
