import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import interestsReducer from './interestsSlice';
import searchReducer from './searchSlice';
import viewsReducer from './viewsSlice';
import billsReducer from './billsSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        interests: interestsReducer,
        search: searchReducer,
        views: viewsReducer,
        bills: billsReducer
    }
});

