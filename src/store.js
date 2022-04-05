import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/reduxSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  }
});