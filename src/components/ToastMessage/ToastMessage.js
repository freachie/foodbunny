/** @format */

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = ({ msg, theme }) => {
	switch (theme?.toLowerCase()) {
		case "dark":
			toast.dark(msg, {
				toastId: "dark1",
			});
			break;
		case "info":
			toast.info(msg, {
				toastId: "info1",
			});
			break;
		case "success":
			toast.success(msg, {
				toastId: "success1",
			});
			break;
		case "error":
			toast.error(msg, {
				toastId: "error1",
			});
			break;
		default:
			toast.warn(msg, {
				toastId: "warn1",
			});
			break;
	}
	
	return (
		<div className="App">
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default ToastMessage;
