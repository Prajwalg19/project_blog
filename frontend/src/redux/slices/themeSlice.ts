import {createSlice} from "@reduxjs/toolkit"

const initialState: {themeState: "dark" | "light"} = {
    themeState: "light"
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
