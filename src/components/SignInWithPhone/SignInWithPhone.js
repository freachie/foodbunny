/** @format */

import "./SignInWithPhone.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../utils-common-config/firebase/firebase";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../utils-common-config/store/slices/userSlice";
import loader from "../../assets/logos/spinner.gif";
import ToastMessage from '../ToastMessage/ToastMessage';
import { getErrorMessage } from "../../utils-common-config/utility/error-message";

const SignInWithPhone = ({
	setShowUserSignInPhone,
	showCloseButton = false,
}) => {
	const [phone, setPhone] = useState("+91");
	const [hasFilled, setHasFilled] = useState(false);
	const [showResendButton, setShowResendButton] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [theme, setTheme] = useState('');
	const [showToastMessage, setShowToastMessage] = useState(false);
	const [otp, setOtp] = useState("");
	const [showOtpVerificationLoader, setShowOtpVerificationLoader] =
		useState(false);
	const [showOtpVerificationFailure, setShowOtpVerificationFailure] =
		useState(false);
	const dispatch = useDispatch();

	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha",
			{
				size: "invisible",
				callback: () => {},
			},
			auth
		);
	};

	const ShowToast = () => {
		setShowToastMessage(true);
		// Setting showToastMessage to false so that on entering OTP, toast message won't show up
		setTimeout(() => {
			setShowToastMessage(false);
		}, 4000);
	};

	const handleSend = async (event) => {
		event.preventDefault();
		setHasFilled(true);
		generateRecaptcha();
		let appVerifier = window.recaptchaVerifier;
		await signInWithPhoneNumber(auth, phone, appVerifier)
			.then((confirmationResult) => {
				setToastMessage("OTP Sent !");
				setTheme("success");
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				window.confirmationResult = confirmationResult;
			})
			.catch((error) => {
				setShowResendButton(true);
				setToastMessage(getErrorMessage(error));
				setTheme("error");
			});
		ShowToast();
	};

	const verifyOtp = (event) => {
		let otp = event.target.value;
		otp = otp.toString().replace(/ /g, "");
		const otpWithSpace = otp.split("").join(" ");
		setOtp(otpWithSpace);
		setShowOtpVerificationFailure(false);

		if (otp.length === 6) {
			setShowOtpVerificationLoader(true);
			// verifu otp
			let confirmationResult = window.confirmationResult;
			confirmationResult
				.confirm(otp)
				.then((result) => {
					const user = {
						phone: auth?.currentUser?.phoneNumber,
						name: auth?.currentUser?.displayName,
						email: auth?.currentUser?.email,
						isUserLoggedIn: true,
					};
					setToastMessage("Logged In !");
					setTheme("success");
					// User signed in successfully.
					dispatch(updateUserDetails(user));
					localStorage.setItem("user", JSON.stringify(user));
					setShowOtpVerificationLoader(false);
				})
				.catch((error) => {
					// User couldn't sign in (bad verification code?)
					setShowOtpVerificationLoader(false);
					setShowOtpVerificationFailure(true);
					setShowResendButton(true);
					setToastMessage(getErrorMessage(error));
					setTheme("error");
				});
			ShowToast();
		}
	};

	return (
		<>
			{!hasFilled ? (
				<div className="signin-container">
					<div className="signin-wrapper">
						{showCloseButton ? (
							<button
								className="close-signin"
								onClick={() => {
									setShowUserSignInPhone(false);
								}}>
								X
							</button>
						) : null}
						<h1 className="signin-heading">Sign In</h1>
						<p variant="h5" component="div" className="signin-desc">
							Sign In using your mobile number
						</p>
						<form onSubmit={handleSend}>
							<p className="signin-title">Phone Number</p>
							<input
								className="signin-input"
								type="text"
								label="Phone Number"
								value={phone}
								maxLength="13"
								onChange={(event) => setPhone(event.target.value)}
							/>
							<button
								type="submit"
								id="phone-submit-btn"
								className="signin-submit-btn"
								variant="contained"
								disabled={!(phone.length >= 13)}>
								Send Code
							</button>
						</form>
					</div>
					<div id="recaptcha"></div>
				</div>
			) : (
				<div className="signin-container">
					<div className="signin-wrapper">
						{showCloseButton ? (
							<button
								className="close-signin"
								onClick={() => {
									setShowUserSignInPhone(false);
								}}>
								X
							</button>
						) : null}
						{showToastMessage ? (
							<ToastMessage
								msg={toastMessage}
								theme={theme}
							/>
						) : null}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
							}}>
							<p className="signin-desc" variant="h5" component="div">
								Enter the OTP
							</p>
							<input
								type="text"
								className="signin-input otp"
								variant="outlined"
								label="OTP "
								value={otp}
								onChange={verifyOtp}
								maxLength="11"
							/>
							{showResendButton ? (
								<button className="resend-otp" onClick={handleSend}>
									Resend OTP..
								</button>
							) : null}
							{showOtpVerificationFailure ? (
								<p className="opt-verify-fail-msg">
									Bad verification code, Verification failed. Please try again.
								</p>
							) : null}
							{showOtpVerificationLoader ? (
								<img src={loader} alt="loader" />
							) : null}
						</div>
					</div>
					<div id="recaptcha"></div>
				</div>
			)}
		</>
	);
};

export default SignInWithPhone;
