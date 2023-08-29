/** @format */

import { useEffect, useState } from "react";
import { LOCATION_NAME_API } from "../../constants";
import { LOCATION_IQ_KEY } from '../../../config/config';

const useLocation = () => {
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		getLocation();
	}, []);

	useEffect(() => {
		if(lat && long) getCityName();
	}, [lat, long]);


  const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			setLat("28.5355161");
			setLong("77.3910265");
		}
	};

	function showPosition(position) {
		setLat(position.coords.latitude);
		setLong(position.coords.longitude);
	}

	const getCityName = async () => {
		const locationNameURL = LOCATION_NAME_API.replace(
			"LATITUDE",
			lat
		).replace("LONGITUDE", long).replace("API_KEY", LOCATION_IQ_KEY);
		const locationNameResp = await fetch(locationNameURL);
		const locationNameData = await locationNameResp.json();
		const areaAddress = locationNameData[0].address;
		const areaName = areaAddress.city ?? areaAddress.name ?? areaAddress.state;
		setName(areaName);
	}

	return [lat, long, name];
};

export default useLocation;
