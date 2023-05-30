import { createSlice } from "@reduxjs/toolkit";
export const loginSlice= createSlice({
    name:"loggedUser",
    initialState:{
        isLoggedIn:false,
        loggedUser:{
        }
    },
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=true;
            state.loggedUser=action.payload;
        },
        logout:(state,action)=>{
            state.isLoggedIn=false;
            state.loggedUser={}
        }
    }


})
export const {login,logout}=loginSlice.actions
export default loginSlice.reducer;