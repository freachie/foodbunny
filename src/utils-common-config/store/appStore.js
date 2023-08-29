import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

const appStore = configureStore({
	reducer: {
		cart: cartReducer,
		user: userReducer,
	},
});

export default appStore;