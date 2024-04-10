import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    localityData: [],
    locationData: [],
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setLocalityData: (state, action) => {
            state.localityData = action.payload
        },

        setLocationData: (state, action) => {
            state.locationData = action.payload
        },
    }
});


export const {setLocalityData, setLocationData} = dataSlice.actions;
export default dataSlice.reducer;