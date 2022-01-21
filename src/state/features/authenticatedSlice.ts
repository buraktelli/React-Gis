import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { ILoginModel } from '../../util/login-model';

interface InitialState {
    isAuthenticated: boolean;
    data: ILoginModel | null;
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    isAuthenticated: localStorage.getItem('isAuth') === 'true',
    data: null,
    loading: false,
    error: ""
}

export const signIn = createAsyncThunk("signIn", async () => {
    const body = {
        username: 'admin',
        password: 'safranbolu2020'
    }
    const response = await axios.post<ILoginModel>('https://dev-gis.ankageo.com/rest/v1/auth/login', body)
    return response.data;
})

const authenticatedSlice = createSlice({
    name: 'authenticated',
    initialState,
    reducers: {
        authenticatedChange: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload
            if (state.isAuthenticated.toString()) {
                state.data = null
            }
            localStorage.setItem('isAuth', state.isAuthenticated.toString())
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state, action) => {
            state.loading = true;
            state.error = "";
            state.data = null;
        })
        builder.addCase(signIn.fulfilled, (state, action: PayloadAction<ILoginModel>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message!
            state.data = null;
        })
    }
})

export default authenticatedSlice.reducer;
export const { authenticatedChange } = authenticatedSlice.actions;