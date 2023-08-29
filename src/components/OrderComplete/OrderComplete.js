import "./OrderComplete.css";
import successIcon from '../../assets/logos/success.gif';
import { Link } from "react-router-dom";
import { useState } from "react";

const OrderComplete = () => {
	const [orderStatus, setOrderStatus] = useState(false);

	const checkLoad = () => {
		setOrderStatus(true);
	}

  return (
		<div className="order-wrapper">
			<div className="order-success">
				<img
					src={successIcon}
					alt="success-icon"
					className="success-icon"
					onLoad={checkLoad}
				/>
				{orderStatus ? (
					<>
						<h1 className="order-success-text">Order Succesfully Placed !!!</h1>
						<Link to="/foodbunny">
							<button className="order-success-home-button">Goto Home</button>
						</Link>
					</>
				) : (
						<h1 className="order-status-check-text">Please wait !! We are placing your order</h1>
				)}
			</div>
		</div>
	);
}

export default OrderComplete;