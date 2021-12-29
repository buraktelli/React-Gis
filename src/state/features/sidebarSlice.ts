import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    visibility: false
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        visibleChange: (state, action: PayloadAction<boolean>) => {
            state.visibility = action.payload
        }
    }
})

export default sidebarSlice.reducer;
export const { visibleChange } = sidebarSlice.actions;