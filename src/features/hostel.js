import { createSlice } from "@reduxjs/toolkit";


const hostel = createSlice({
    name:"hostel",
    initialState:{
        hostel:""
    },
    reducers:{
        createHostel:(state,action) => {
            state.hostel =  action.payload
        }
    }
});

export const {createHostel} = hostel.actions;
export const selectHostel = (state) => state.hostel.hostel

export default hostel.reducer;