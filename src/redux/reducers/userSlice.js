import { createSlice } from "@reduxjs/toolkit";
import { userData } from '../stores/userData'

export const userSlice = createSlice({
	name: 'users',
	initialState: userData,
	reducers: {
		create: (state, action) => {
			state.push(action.payload)
		},
		update: (state, action) => {
			const { id, fname, lname, phone } = action.payload;
			const item = state.find(item => item.id === +id);
			if (item) {
				item.fname = fname;
				item.lname = lname;
				item.phone = phone;
			}

		}
	}
})

export const { create, update } = userSlice.actions;
export const userSelector = (state) => state.users
export default userSlice.reducer;