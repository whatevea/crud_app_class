import { createSlice } from "@reduxjs/toolkit";
import {data} from '../stores/data'

export const crudSlice = createSlice({
    name: 'crud',
    initialState: data,
    reducers: {
        create : (state, action) => {
            state.push(action.payload)
        },
        update: (state, action) => {
            const {id, fname,lname,gender, country, dob, email} = action.payload
            const uid = state.find(item => +item.id === +id)
            if(uid) {
                uid.id= id;
                uid.fname = fname;
                uid.lname = lname;
                uid.country = country;
                uid.gender = gender;
                uid.email = email;
                uid.dob = dob
            }
            
        },
        deleteData: (state, action)=> {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const {create, update, deleteData } = crudSlice.actions;
export const crudSelector = (state) => state.crud
export default crudSlice.reducer;