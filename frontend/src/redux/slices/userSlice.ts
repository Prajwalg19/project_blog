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

    }
})


export const {loginSuccess} = userSlice.actions;
export default userSlice.reducer;
