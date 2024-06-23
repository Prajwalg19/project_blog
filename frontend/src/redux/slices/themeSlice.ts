import {createSlice} from "@reduxjs/toolkit"

const theme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";

const initialState: {themeState: "dark" | "light"} = {
    themeState: theme
}


const themeSlice = createSlice({
    initialState,
    name: "theme",
    reducers: {
        changeTheme: (state) => {
            state.themeState == "light" ? state.themeState = "dark" : state.themeState = 'light'
        }

    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;
