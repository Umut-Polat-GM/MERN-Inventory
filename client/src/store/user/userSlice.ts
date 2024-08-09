import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: {},
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.userInfo = {};
        },
    },
});

export const { setUserInfo, logout } = UserSlice.actions;
export default UserSlice.reducer;
