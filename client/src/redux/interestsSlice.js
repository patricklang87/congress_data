import { createSlice } from '@reduxjs/toolkit';

const interestsSlice = createSlice({
    name: "interests",
    initialState: {
        subjects: [],
        legislators: []
    },
    reducers: {
        addSubject: (state, action) => {
            state.subjects = [...state.subjects, action.payload];
        },
        removeSubject: (state, action) => {
            state.subjects = state.subjects.filter(item => item !== action.payload);
        },
        addLegislator: (state, action) => {
            state.legislators = [...state.legislators, action.payload]
        },
        removeLegislator: (state, action) => {
            state.legislators = state.legislators.filter(item => item.name !== action.payload);
        },
        loadInterests: (state, action) => {
            state.legislators = action.payload.legislators;
            state.subjects = action.payload.subjects;
        },
        removeInterests: (state) => {
            state.legislators = [];
            state.subjects = [];
        }
    }
});

export const { addSubject, removeSubject, addLegislator, removeLegislator, loadInterests, removeInterests } = interestsSlice.actions;
export default interestsSlice.reducer