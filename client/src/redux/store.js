import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import interestsReducer from './interestsSlice';
import searchReducer from './searchSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        interests: interestsReducer,
        search: searchReducer
    }
});

