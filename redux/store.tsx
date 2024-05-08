import { configureStore } from '@reduxjs/toolkit';
import airtimeSlice from './Slices/airtime/airtimeSlice';

export const store = configureStore({
    reducer: {
        airtime: airtimeSlice
    },
});