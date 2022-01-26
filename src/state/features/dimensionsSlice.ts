import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    width: number;
    height: number
}

const initialState = {
    width: window.innerWidth,
    height: window.innerHeight
}

const dimensionsSlice = createSlice({
    name: 'dimensions',
    initialState,
    reducers: {
        dimensionsChange: (state, action: PayloadAction<InitialState>) => {
            state.width = action.payload.width
            state.height = action.payload.height
        }
    }
})

export default dimensionsSlice.reducer;
export const { dimensionsChange } = dimensionsSlice.actions;