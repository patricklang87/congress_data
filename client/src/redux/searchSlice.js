import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: "search",
    initialState: {
        legislators: [],
        subjects: [],
        nameSearchTerm: '',
        stateSearchTerm: '',
        districtSearchTerm: '',
    },
    reducers: {
        addPotentialLegislator: (state, action) => {
            let currentLegisNames = state.legislators.map(item => {return item.name});
            let newLegislators = action.payload.filter(item => {
                return !currentLegisNames.includes(item.name);
            })
            state.legislators = [...state.legislators, ...newLegislators];
        },
        removePotentialLegislator: (state, action) => {
            const newList = state.legislators.filter(item => {
                return (item.name !== action.payload.name)});
            state.legislators = newList;
        },
        addPotentialSubject: (state, action) => {
            let currentTopicNames = state.topics.map(item => {return item.name});
            let newTopics = action.payload.filter(item => {
                return !currentTopicNames.includes(item.name);
            })
            state.topics = [...state.topics, ...newTopics];
        },
        removePotentialSubject: (state, action) => {
            const newList = state.topics.filter(item => {
                return (item.name !== action.payload.name)});
            state.topics = newList;
        },
        updateSearchTerms: (state, action) => {
            if (action.payload.field === "name") state.nameSearchTerm = action.payload.value;
            if (action.payload.field === "state") state.stateSearchTerm = action.payload.value;
            if (action.payload.field === "district") state.districtSearchTerm = action.payload.value;
        },
        clearSearchTerms: (state) => {
            state.nameSearchTerm = '';
            state.stateSearchTerm = '';
            state.districtSearchTerm = '';
        }
    }
});

export const { addPotentialLegislator, removePotentialLegislator, addPotentialSubject, removePotentialSubject, updateSearchTerms, clearSearchTerms } = searchSlice.actions;
export default searchSlice.reducer;