import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {activitySlice} from "../features/activities/activitySlice";
import {accountSlice} from "../features/users/accountSlice";
import {profileSlice} from "../features/profiles/profileSlice";

export const store = configureStore({
    reducer: {
        activity: activitySlice.reducer,
        account: accountSlice.reducer,
        profile: profileSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;