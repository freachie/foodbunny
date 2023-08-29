/** @format */
import "./AboutCard.css";
import React from "react";
import AboutLoader from "../loaders/AboutLoader";
import companyLogo from "../../assets/logos/company.png";
import locationLogo from "../../assets/logos/location.png";
import gitLogo from "../../assets/logos/git.png";
import codeLogo from "../../assets/logos/code.png";

class AboutCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			githubData: null,
		};
	}

	componentDidMount() {
		fetch(this.props?.gitUrl).then(async (result) => {
			const data = await result.json();
			this.setState({ githubData: data });
		});
	}

	render() {
		const { githubData } = this.state;
		return githubData ? (
			<>
				<div className="about-main">
					<img
						src={githubData?.avatar_url}
						alt="User-image"
						className="avatar"
					/>
					<div className="user">
						<p className="user-name">
							{githubData?.name + " (" + this.props?.role + ")"}
						</p>
						<p className="bio">{githubData?.bio}</p>
						<div className="company">
							<img
								className="company-logo"
								src={companyLogo}
								alt="company-logo"
							/>
							<p className="company-name">{githubData?.company}</p>
						</div>
						<div className="user-location">
							<img
								className="location-logo"
								src={locationLogo}
								alt="location-logo"
							/>
							<p className="user-location-name">{githubData?.location}</p>
						</div>
						<div className="external-links">
							<a href={githubData?.blog} target="_blank">
								<img className="code-logo" src={codeLogo} alt="code-logo" />
							</a>
							<a href={githubData?.html_url} target="_blank">
								<img className="git-logo" src={gitLogo} alt="git-logo" />
							</a>
						</div>
					</div>
				</div>
			</>
		) : (
			<AboutLoader />
		);
	}
}

export default AboutCard;
