/** @format */

import React from "react";
import "./About.css";
import AboutCard from '../AboutCard/AboutCard';
import {
	VISH_GITHUB_USER_URL,
	AKSHAY_GITHUB_USER_URL,
} from "../../utils-common-config/constants/constants";

class About extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<div className="about-wrapper">
					<AboutCard gitUrl={VISH_GITHUB_USER_URL} role="Developer"/>
					<AboutCard gitUrl={AKSHAY_GITHUB_USER_URL} role="Mentor"/>
				</div>
			</>
		);
	}
}

export default About;
