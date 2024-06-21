import {createSlice} from "@reduxjs/toolkit";

type typeOfInitState = {
    currentUser: null | {
        userName: string,
        userPfp: string,
        email: string,
        _id: string
    },
}

const initialState: typeOfInitState = {
    currentUser: null,
}

const userSlice = createSlice({
    initialState: initialState,
    name: "user",
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        logOut: (state) => {
            state.currentUser = null
        },


    }
})


export const {loginSuccess, logOut} = userSlice.actions;
export default userSlice.reducer;
