// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {counterSlice}  from './counterSlice';
import settingsSlice from "@/store/settingsSlice";
import userSlice from "@/store/userSlice";


export const makeStore = () =>
    configureStore({
        reducer: {
            counter: counterSlice.reducer,
            settings: settingsSlice.reducer,
            user: userSlice.reducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);