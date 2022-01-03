import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    visibility: false
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        tableVisibleChange: (state, action: PayloadAction<boolean>) => {
            state.visibility = action.payload
        }
    }
})

export default tableSlice.reducer;
export const { tableVisibleChange } = tableSlice.actions;