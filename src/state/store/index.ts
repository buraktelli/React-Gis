import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import sidebarSlice from "../features/sidebarSlice";
import tableSlice from "../features/tableSlice";
import servicesSlice from "../features/servicesSlice";
import authenticatedSlice from "../features/authenticatedSlice";
import dimensionsSlice from "../features/dimensionsSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarSlice,
        table: tableSlice,
        services: servicesSlice,
        authenticated: authenticatedSlice,
        dimensions: dimensionsSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;