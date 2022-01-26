import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Mode {
    PANO = 'Pano',
    MAP = 'Map',
    BOTH = 'Map&Pano'
}

interface FullScreenMode {
    mode: Mode.PANO | Mode.MAP | Mode.BOTH
}
const initialState: FullScreenMode = {
    mode: window.innerWidth > 580 ? Mode.BOTH : Mode.MAP
}

const fullScreenSlice = createSlice({
    name: 'fullScreenMode',
    initialState,
    reducers: {
        fullScreenModeChange: (state, action: PayloadAction<Mode.PANO | Mode.MAP | Mode.BOTH>) => {
            state.mode = action.payload
        }
    }
})

export default fullScreenSlice.reducer;
export const { fullScreenModeChange } = fullScreenSlice.actions;