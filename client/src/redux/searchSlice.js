import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: "search",
    initialState: {
        senators: [],
        congresspeople: [],
        subjects: [],
        nameSearchTerm: '',
        stateSearchTerm: '',
        districtSearchTerm: '',
        subjectSearches: [],
        searchInSubjectsTerm: ''
    },
    reducers: {
        loadPotentialSenators: (state, action) => {
            let currentLegisNames = state.senators.map(item => {return item.id});
            let newLegislators = action.payload.filter(item => {
                return !currentLegisNames.includes(item.id);
            })
            state.senators = [...state.senators, ...newLegislators];
        },
        removePotentialSenator: (state, action) => {
            const newList = state.senators.filter(item => {
                return (item.id !== action.payload.id)});
            state.senators = newList;
        },
        loadPotentialCongresspeople: (state, action) => {
            let currentLegisNames = state.congresspeople.map(item => {return item.id});
            let newLegislators = action.payload.filter(item => {
                return !currentLegisNames.includes(item.id);
            })
            state.congresspeople = [...state.congresspeople, ...newLegislators];
        },
        removePotentialCongressperson: (state, action) => {
            const newList = state.congresspeople.filter(item => {
                return (item.id !== action.payload.id)});
            state.congresspeople = newList;
        },
        loadPotentialSubjects: (state, action) => {
            let currentSubjectNames = state.subjects.map(item => {return item.name});
            let newSubjects = action.payload.filter(item => {
                return !currentSubjectNames.includes(item.name);
            })
            state.subjects = [...state.subjects, ...newSubjects];
        },
        removePotentialSubject: (state, action) => {
            const newList = state.subjects.filter(item => {
                return (item.name !== action.payload.name)});
            state.subjects = newList;
        },
        clearPotentialSubjects: (state) => {
            state.subjects = [];
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
        },
        addSubjectSearch: (state, action) => {
            state.subjectSearches = [action.payload, ...state.subjectSearches];
        },
        removeSubjectSearch: (state, action) => {
            const newList = state.subjectSearches.filter((item) => {
                return item !== action.payload
            });
            state.subjectSearches = newList;
        },
        setSearchInSubjectsTerm: (state, action) => {
            state.searchInSubjectsTerm = action.payload;
        }
    }
});

export const { loadPotentialSenators, removePotentialSenator, loadPotentialCongresspeople, removePotentialCongressperson, loadPotentialSubjects, removePotentialSubject, updateSearchTerms, clearSearchTerms, addSubjectSearch, setSearchInSubjectsTerm, clearPotentialSubjects, removeSubjectSearch } = searchSlice.actions;
export default searchSlice.reducer;