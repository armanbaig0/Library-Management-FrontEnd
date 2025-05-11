//  Store file for redux toolkit in NextJS
// Creating a Redux Store per Request
//  The first change is to move from defining store as a global to defining a makeStore function 
//  that returns a new store for each request:

import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

