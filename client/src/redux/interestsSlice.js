import { createSlice } from '@reduxjs/toolkit';

const interestsSlice = createSlice({
    name: "interests",
    initialState: {
        subjects: [],
        legislators: {
            senators: [],
            congresspeople: []
        }
    },
    reducers: {
        addSubject: (state, action) => {
            state.subjects = [...state.subjects, action.payload];
        },
        removeSubject: (state, action) => {
            state.subjects = state.subjects.filter(item => item !== action.payload);
        },
        trackSenator: (state, action) => {
            state.legislators.senators = [...state.legislators.senators, action.payload]
        },
        removeSenator: (state, action) => {
            state.legislators.senators = state.legislators.senators.filter(item => item.id !== action.payload.id);
        },
        trackCongressperson: (state, action) => {
            state.legislators.congresspeople = [...state.legislators.congresspeople, action.payload]
        },
        removeCongressperson: (state, action) => {
            state.legislators.congresspeople = state.legislators.congresspeople.filter(item => item.id !== action.payload.id);
        },
        loadInterests: (state, action) => {
            state.legislators = action.payload.legislators;
            state.subjects = action.payload.subjects;
        },
        removeInterests: (state) => {
            state.legislators = {senators: [], congresspeople: []};
            state.subjects = [];
        }
    }
});

export const { addSubject, removeSubject, trackSenator, removeSenator, trackCongressperson, removeCongressperson, loadInterests, removeInterests } = interestsSlice.actions;
export default interestsSlice.reducer