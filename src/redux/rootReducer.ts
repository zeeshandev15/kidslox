'use client';

import { combineReducers } from '@reduxjs/toolkit';

import stocksReducer from './slices/stockSlice';
import authReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stocksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
