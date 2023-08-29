import { Link } from "react-router-dom";
import "./Suggestions.css";

const Suggestions = ({ location, setCurrentLocation }) => {
	return (
		<Link
			to="/foodbunny"
			onClick={() => setCurrentLocation(location)}
			className="suggestions">
			{location.display_name}
		</Link>
	);
};

export default Suggestions;