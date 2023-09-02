const RESTAURANT_PIC_URL = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
const RESTAURANTS_LIST_API = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=LATITUDE&lng=LONGITUDE&page_type=DESKTOP_COLLECTION_LISTING";
const RESTAURANT_MENU_API =
	"https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=LATITUDE&lng=LONGITUDE&restaurantId=RESTAURANT_ID&catalog_qa=undefined&submitAction=ENTER";
const MENU_ITEM_PIC =
	"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
const LOCATIONS_API =
	"https://us1.locationiq.com/v1/search?key=API_KEY&q=LOCATION&format=json";
const LOCATION_NAME_API =
	"https://us1.locationiq.com/v1/nearby?key=API_KEY&lat=LATITUDE&lon=LONGITUDE&tag=all&radius=2000&format=json";
const CORS_PROXY = "https://corsproxy.io/?";
const Search_NavBar = 'Search';
const Offers_NavBar = 'Offers';
const ContactUs_NavBar = "Contact Us";
const Help_NavBar = 'Help';
const SignIn_NavBar = 'Sign In';
const Cart_NavBar = 'Cart';
const About_NavBar = "About";
const ADD_BUTTON_TEXT = "ADD";
const TOP_RATED_BUTTON = 'Top Rated Restaurants';
const ALL_RESTAURANTS_BUTTON = "All restaurants";
const LOADER_COUNT = ['', '', '', '', '', ''];
const TOP_RATED_AVG_RATING = 4.1;
const VISH_GITHUB_USER_URL = "https://api.github.com/users/freachie";
const AKSHAY_GITHUB_USER_URL = "https://api.github.com/users/akshaymarch7";
const LOCATION_NOT_SERVICABLE = "swiggy_not_present";
const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]{2,3}");
const PASSWORD_MINIMUM_LENGTH = 8;

export {
	RESTAURANT_PIC_URL,
	Search_NavBar,
	Offers_NavBar,
	Help_NavBar,
	ContactUs_NavBar,
	Cart_NavBar,
	About_NavBar,
	SignIn_NavBar,
	TOP_RATED_BUTTON,
	LOADER_COUNT,
	RESTAURANTS_LIST_API,
	ALL_RESTAURANTS_BUTTON,
	TOP_RATED_AVG_RATING,
	RESTAURANT_MENU_API,
	MENU_ITEM_PIC,
	ADD_BUTTON_TEXT,
	VISH_GITHUB_USER_URL,
	AKSHAY_GITHUB_USER_URL,
	LOCATIONS_API,
	LOCATION_NOT_SERVICABLE,
	LOCATION_NAME_API,
	EMAIL_REGEX,
	PASSWORD_MINIMUM_LENGTH,
	CORS_PROXY,
};