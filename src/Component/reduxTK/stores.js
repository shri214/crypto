import { configureStore } from '@reduxjs/toolkit';
import { dataReducer, watchItem } from './dataSlice';


export const stores=configureStore({
    reducer:{
        data:dataReducer,
        item:watchItem,
    }
})
