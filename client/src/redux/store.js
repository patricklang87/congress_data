import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import interestsReducer from './interestsSlice';
import searchReducer from './searchSlice';
import viewsReducer from './viewsSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        interests: interestsReducer,
        search: searchReducer,
        views: viewsReducer
    }
});

