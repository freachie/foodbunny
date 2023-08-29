/** @format */

import "./UserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	PhoneAuthProvider,
	RecaptchaVerifier,
	signOut,
	updateProfile,
	updatePhoneNumber,
} from "firebase/auth";
import { auth } from "../../utils-common-config/firebase/firebase";
import { updateUserDetails } from "../../utils-common-config/store/slices/userSlice";
import editLOGO from "../../assets/logos/edit.png";
import { getUserFromFirebase } from "../../utils-common-config/utility/user-utility";
import ToastMessage from "../ToastMessage/ToastMessage";
import { getErrorMessage } from "../../utils-common-config/utility/error-message";

const UserDetails = () => {
	const [enableUserNameUpdate, setEnableUserNameUpdate] = useState(false);
	const [enableUserPhoneUpdate, setEnableUserPhoneUpdate] = useState(false);
	const [showOTPInput, setShowOTPInput] = useState(false);
	const [verificationId, setVerificationId] = useState("");
	const [otp, setOTP] = useState("");
	const user = useSelector((store) => store.user);
	const [userName, serUserName] = useState(user.name);
	const [userPhone, serUserPhone] = useState(user.phoneNumber ?? "+91");
	const [showToastMessage, setShowToastMessage] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [theme, setTheme] = useState("");
	const dispatch = useDispatch();

	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			"user-phone-number",
			{
				size: "invisible",
				callback: () => {},
			},
			auth
		);
	};

	const ShowToast = () => {
		setShowToastMessage(true);
		setTimeout(() => {
			setShowToastMessage(false);
		}, 4000);
	}

	const logOut = async () => {
		try {
			await signOut(auth);
			localStorage.clear();
			setToastMessage("Logged Out !");
			setTheme("success");
			dispatch(updateUserDetails({}));
		} catch (err) {
			setToastMessage(getErrorMessage(err));
			setTheme("error");
		}
		ShowToast();
	};

	const updateDisplayName = async (displayName) => {
		await updateProfile(auth.currentUser, { displayName });
		dispatch(updateUserDetails(getUserFromFirebase(auth.currentUser)));
	};

	const getOTP = async (phoneNumber) => {
		generateRecaptcha();
		let applicationVerifier = window.recaptchaVerifier;
		const provider = new PhoneAuthProvider(auth);
		let id;
		try {
			id = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
			setToastMessage("OTP Sent !");
			setTheme("success");
			setShowOTPInput(true);
		} catch (err) {
			setToastMessage(getErrorMessage(err));
			setTheme("error");
		}
		ShowToast();
		setVerificationId(id);
	};

	const updatePhone = async (otp) => {
		try {
			const phoneCredential = PhoneAuthProvider.credential(verificationId, otp);
			await updatePhoneNumber(auth.currentUser, phoneCredential);
			dispatch(updateUserDetails(getUserFromFirebase(auth.currentUser)));
			setEnableUserPhoneUpdate(false);
			setShowOTPInput(false);
			setToastMessage("Phone Number Updated Successfully !!");
			setTheme("success");
		} catch (err) {
			setToastMessage(getErrorMessage(err));
			setTheme("error");
		}
		ShowToast();
	};

	return (
		<>
			<div className="user-details-wrapper">
				{showToastMessage ? (
					<ToastMessage msg={toastMessage} theme={theme} />
				) : null}
				<div className="user-details">
					<span>Name : </span>
					{enableUserNameUpdate ? (
						<input
							type="text"
							value={userName}
							onChange={(e) => serUserName(e.target.value)}
							className="user-input"
						/>
					) : (
						<p>{user.name?.length ? user.name : "-"}</p>
					)}
					{enableUserNameUpdate ? (
						<div className="user-update">
							<button
								className="update-details"
								onClick={() => {
									updateDisplayName(userName);
									setEnableUserNameUpdate(false);
								}}>
								Update
							</button>
							<button
								className="update-details cancel"
								onClick={() => {
									setEnableUserNameUpdate(false);
								}}>
								Cancel
							</button>
						</div>
					) : (
						<img
							src={editLOGO}
							alt="edit"
							className="edit-icon"
							onClick={() => setEnableUserNameUpdate(true)}
						/>
					)}
					<span>Phone : </span>
					{enableUserPhoneUpdate ? (
						<input
							type="text"
							placeholder="+91"
							maxLength="13"
							value={userPhone}
							onChange={(e) => serUserPhone(e.target.value)}
							className="user-input"
							id="user-phone-number"
						/>
					) : (
						<p>{user.phone ?? "-"}</p>
					)}

					{enableUserPhoneUpdate ? (
						<div className="user-update">
							<button
								className="update-details"
								onClick={() => {
									getOTP(userPhone);
								}}>
								Get OTP
							</button>
							<button
								className="update-details cancel"
								onClick={() => {
									setEnableUserPhoneUpdate(false);
									setShowOTPInput(false);
								}}>
								Cancel
							</button>
						</div>
					) : (
						<img
							src={editLOGO}
							alt="edit"
							className="edit-icon"
							onClick={() => setEnableUserPhoneUpdate(true)}
						/>
					)}
					{showOTPInput ? (
						<>
							<span>Enter OTP : </span>
							<input
								type="text"
								value={otp}
								onChange={(e) => setOTP(e.target.value)}
							/>
							<button
								className="update-details"
								onClick={() => {
									updatePhone(otp);
								}}>
								Update Phone
							</button>
						</>
					) : null}
					<span>Email : </span>
					<p>{user.email}</p>
				</div>
				<Link to="/foodbunny/signin">
					<button
						className="signin-submit-btn email-submit user-logout"
						onClick={logOut}>
						logOut
					</button>
				</Link>
			</div>
		</>
	);
};

export default UserDetails;
