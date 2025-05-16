
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import addBookReducer from '../features/addBooks/addBookSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    theme: themeReducer,
    addBook: addBookReducer,
  },
});

