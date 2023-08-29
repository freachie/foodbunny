/** @format */
import "./SignInWithEmail.css";
import {
	auth,
	googleProvider,
} from "../../utils-common-config/firebase/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	sendSignInLinkToEmail,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../utils-common-config/store/slices/userSlice";
import googleIcon from "../../assets/logos/google.svg";
import backArrowIcon from "../../assets/logos/back-arrow.png";
import {
	EMAIL_REGEX,
	PASSWORD_MINIMUM_LENGTH,
} from "../../utils-common-config/constants";
import { getErrorMessage } from "../../utils-common-config/utility/error-message";

const SignInWithEmail = ({
	setShowUserSignInEmail,
	showCloseButton = false,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInError, setSignInError] = useState("");
	const [showSignIn, setShowSignIn] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const [showBackButton, setShowBackButton] = useState(false);;
	const [isValidEmail, setIsValidEmail] = useState(false);
	let signInUser;

	const dispatch = useDispatch();

	const saveUser = (signInUser) => {
		const user = {
			phone: signInUser?.user?.phoneNumber,
			name: signInUser?.user?.displayName,
			email: signInUser?.user?.email,
			isUserLoggedIn: true,
		};
		dispatch(updateUserDetails(user));
		localStorage.setItem("user", JSON.stringify(user));
		if (!showCloseButton) window.location = window.location.origin + '/foodbunny';
	};

	const setErrorMessage = (err) => {
		setSignInError(getErrorMessage(err));
	}

	const signIn = async () => {
		try {
			if (!password.length) {
				setSignInError("Password is required !");
			} else if (password.length < PASSWORD_MINIMUM_LENGTH) {
				setSignInError("Password length should be minimum of 8 characters");
			} else {
				if (showRegister) {
					signInUser = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					saveUser(signInUser);
				}
				else {
					signInUser = await signInWithEmailAndPassword(auth, email, password);
					saveUser(signInUser);

					//TODO : Signin with Email link -

					// sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
					// 	window.localStorage.setItem("emailForSignIn", email);
					// });
				}
			}
		} catch (err) {
			setErrorMessage(err);
		}
	};

	const signInWithGoogle = async () => {
		try {
			const signInUser = await signInWithPopup(auth, googleProvider);
			saveUser(signInUser);
		} catch (err) {
			setErrorMessage(err);
		}
	};

	const verifyEmail = (email) => {
		setSignInError("");
		setEmail(email);
		setIsValidEmail(EMAIL_REGEX.test(email));
	}

	return (
		<div className="signin-container">
			<div className="signin-wrapper email-wrapper">
				{showCloseButton ? (
					<button
						className="close-signin email-close"
						onClick={() => {
							setShowUserSignInEmail(false);
						}}>
						X
					</button>
				) : null}
				{(showSignIn || showRegister) ? (
					<>
						{showBackButton ? (
							<button
								className="close-signin back-button-email-signin"
								onClick={() => {
									setShowSignIn(false);
									setShowRegister(false);
									setShowBackButton(false);
									setSignInError("");
								}}>
								<img
									src={backArrowIcon}
									alt="back-arrow"
									className="back-arrow-email-signin"
								/>
							</button>
						) : null}
						{signInError.length ? (
							<p className="email-signin-error">{signInError}</p>
						) : (
							<p></p>
						)}
						<input
							className="signin-input email-input"
							placeholder="Email.."
							onChange={(e) => {
								verifyEmail(e.target.value);
							}}
						/>
						<input
							className="signin-input password-input"
							type="password"
							placeholder="Password.."
							onChange={(e) => {
								setPassword(e.target.value);
								setSignInError("");
							}}
						/>
						<button
							className="signin-submit-btn email-submit"
							onClick={signIn}
							disabled={!isValidEmail}>
							{showRegister ? "Register" : "SignIn"}
						</button>
					</>
				) : (
					<>
						<button
							className="signin-submit-btn email-submit"
							onClick={() => {
								setShowRegister(true);
								setShowBackButton(true);
							}}>
							New User* - Register
						</button>
						<button
							className="signin-submit-btn email-submit"
							onClick={() => {
								setShowSignIn(true);
								setShowBackButton(true);
							}}>
							Existing User - Sign In
						</button>
						<button
							className="signin-submit-btn google-signin"
							onClick={signInWithGoogle}>
							<img src={googleIcon} alt="google-icon" className="google-icon" />
							Signin with google
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default SignInWithEmail;
