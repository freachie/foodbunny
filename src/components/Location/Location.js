/** @format */

import "./Location.css";
import { useEffect, useState, useCallback, useContext } from "react";
import down from "../../assets/logos/down.png";
import Suggestions from "../Suggestions/Suggestions";
import * as cities from '../../utils-common-config/constants/location-data.json'
import { LOCATIONS_API } from '../../utils-common-config/constants';
import locationIcon from '../../assets/logos/location.png';
import AppContext from "../../utils-common-config/context/AppContext";
import { LOCATION_IQ_KEY } from '../../config/config';

const Location = () => {
	const [showLocationBar, setShowLocationBar] = useState(false);
	const [locationsList, setLocationsList] = useState([]);
	const [locationData, setLocationData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [locationName, setLocationName] = useState("");
	const { location, setLocation } = useContext(AppContext);

	useEffect(() => {
		const list = [];
		locationData?.forEach((location) => {
			list.push({
				display_name: location.display_name,
				lat: location.lat,
				long: location.lon,
			});
		});
		setLocationsList(list);
	}, [locationData]);

	useEffect(() => {
		setLocationName(location.areaName)
	 }, [location.areaName]);

	const getLocation = () => {
		setShowLocationBar(true);
	};

	const getSearchedLocation = async (text) => {
		const url = LOCATIONS_API.replace("LOCATION", text).replace(
			"API_KEY",
			LOCATION_IQ_KEY
		);
		const resp = await fetch(url);
		const data = await resp.json();
		setLocationData(data);		
	};

	const debouncing = (func) => {
		let timer;
		return (text) => {
			setSearchText(text);
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, [text]);
			}, 500);
		};
	};

	const debounce = useCallback(debouncing(getSearchedLocation), []);

	const setCurrentLocation = (data) => {
		// TODO : After redux implementation, Need to update location name from redux
		if (data) {
			setLocationName(data.display_name);
		}
		setShowLocationBar(false);

		// Update current lat long here -
		setLocation({lat: data.lat, long: data.long, areaName: data.display_name});
	};

	return (
		<div className="dropdown">
			<div className="delivering-at">
				<img className="delivering-at-icon" src={locationIcon} alt="location-pin"/>
				<p className="delivering-at-text">Delivering at ...</p>
			</div>
			{!showLocationBar ? (
				<button className="dropbtn" onClick={() => getLocation()}>
					<p className="location-name">{locationName ?? location?.areaName}</p>
					<img
						src={down}
						alt="search-location-dropdown"
						className="location-dropdown"
					/>
				</button>
			) : (
				<div id="search-input">
					<input
						className="search-input"
						placeholder="Search location..."
						alt="search"
						value={searchText}
						onChange={(e) => debounce(e.target.value)}
						autoFocus
					/>
					{locationsList?.length ? (
						<div
							className="dropdown-content"
							id="myDropdown"
							onBlur={() => setCurrentLocation(null)}>
							{locationsList.map((location, index) => (
								<Suggestions
									location={location}
									key={index}
									setCurrentLocation={setCurrentLocation}
								/>
							))}
						</div>
					) : null}
				</div>
			)}
		</div>
	);
};

export default Location;
