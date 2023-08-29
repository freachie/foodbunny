/** @format */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: {},
		restId: 0,
		addedRestaurant: {},
		currentRest: {},
		totalItems: 0,
	},
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			if (!state.items[item.id]) {
				state.items[item.id] = item;
			}
			else {
				const repeatItem = state.items[item.id];
				repeatItem.count = repeatItem.count + 1;
				state.items[item.id] = repeatItem;
			}
			state.totalItems = state.totalItems + 1;
		},
		removeFromCart: (state, action) => {
			const item = state.items[action.payload.id];
			item.count = item.count - 1;
			if (item.count) {
				state.items[item.id] = item;
			}
			else {
				const items = state.items;
				delete items[item.id];
				state.items = items;
			}
			state.totalItems = state.totalItems - 1;
		},
		clearCart: (state) => {
			state.items = {};
			state.totalItems = 0;
		},
		updateAddedRestaurant: (state, action) => {
			state.addedRestaurant = action.payload;
		},
		updateRestId: (state, action) => {
			state.restId = action.payload;
		},
		updateCurrentRest: (state, action) => {
			state.currentRest = action.payload;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	clearCart,
	updateRestId,
	updateAddedRestaurant,
	updateCurrentRest,
} = cartSlice.actions;
export default cartSlice.reducer;
