/** @format */

import "./ContactUs.css";
import locationIcon from "../../assets/logos/location.png";
import phoneIcon from "../../assets/logos/phone.png";
import emailIcon from "../../assets/logos/email.png";

const ContactUs = () => {
	return (
		<>
			<div className="contact-us-wrapper">
				<h1>Contact Us</h1>
				<p className="contact-us-description">
					We have in place appropriate technical and security measures to secure
					the information collected by us. We use vault and tokenization
					services from third party service providers to protect the sensitive
					personal information provided by you.
				</p>
				<div className="contact-us-container">
					<div className="contact-us-info">
						<div className="contact-us-info-address">
							<img
								src={locationIcon}
								alt="address-pin"
								className="contact-icons"
							/>
							<div className="contact-us-address-wrapper">
								<p className="contact-us-titles"> Address</p>
								<p className="contact-info-details"> B block, Techzone IV, Greater Noida, Uttar Pradesh, 201039</p>
							</div>
						</div>
						<div className="contact-us-info-phone">
							<img src={phoneIcon} alt="phone-icon" className="contact-icons" />
							<div className="contact-us-phone-wrapper">
								<p className="contact-us-titles"> Phone</p>
								<p className="contact-info-details"> 9760462946</p>
							</div>
						</div>
						<div className="contact-us-info-email">
							<img src={emailIcon} alt="email-icon" className="contact-icons" />
							<div className="contact-us-email-wrapper">
								<p className="contact-us-titles"> Email</p>
								<p className="contact-info-details"> support@foodbunny.com</p>
							</div>
						</div>
					</div>
					<form className="contact-us-form">
						<h2>Send Your Query/Feedback</h2>
						<div className="contact-us-form-input">
							<input required />
							<span>Full Name</span>
						</div>
						<div className="contact-us-form-input">
							<input required />
							<span>Email</span>
						</div>
						<div className="contact-us-form-input">
							<input required />
							<span>Type your message...</span>
						</div>
						<button className="contact-us-submit-btn">Send</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ContactUs;
