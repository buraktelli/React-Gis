import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'
import { IServiceModel } from '../../util/service-model';

interface InitialState {
    data: IServiceModel | null;
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    data: null,
    loading: false,
    error: ""
}

export const getServices = createAsyncThunk("getServices", async () => {
    const response = await axios.get<IServiceModel>('https://dev-gis.ankageo.com/rest/v1/services')
    return response.data;
})

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getServices.pending, (state, action) => {
            state.loading = true;
            state.error = ""
        })
        builder.addCase(getServices.fulfilled, (state, action: PayloadAction<IServiceModel>) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(getServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!
        })
    }
})

export default servicesSlice.reducer;