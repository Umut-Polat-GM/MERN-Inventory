import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModeState {
    mode: "light" | "dark";
    isDrawerOpen: boolean;
}

// const initialState: ModeState = {
//     mode: "light",
//     isDrawerOpen: false,
// };

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: "light",
        isDrawerOpen: false,
    } as ModeState,
    reducers: {
        setMode: (state, action: PayloadAction<"light" | "dark">) => {
            state.mode = action.payload;
        },
        setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        },
    },
});

export const { setMode, setIsDrawerOpen } = modeSlice.actions;
export default modeSlice.reducer;
