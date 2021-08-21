import { createSlice } from '@reduxjs/toolkit';

const billsSlice = createSlice({
    name: "bills",
    initialState: {
        byTrackedSubjects: true,
        trackedSubjectBills: [],
        allSubjectBills: [],
        bookmarkedBills: []
    },
    reducers: {
        setByTrackedSubjects: (state, action) => {
            state.byTrackedSubjects = action.payload;
        },
        setTrackedSubjectBills: (state, action) => {
            state.trackedSubjectBills = action.payload;
        },
        setAllSubjectBills: (state, action) => {
            state.allSubjectBills = action.payload;
        },
        setBookmarkedBills: (state, action) => {
            state.bookmarkedBills = action.payload;
        },
        addBookmarkedBill: (state, action) => {
            state.bookmarkedBills = [...state.bookmarkedBills, action.payload];
        },
        removeBookmarkedBill: (state, action) => {
            const newBookmarkedBills = state.bookmarkedBills.filter(item => {
                return item.bill_id !== action.payload.bill_id;
            });
            state.bookmarkedBills = newBookmarkedBills;
        },
        removeAllBookmarks: (state) => {
            state.bookmarkedBills = [];
        }
    }
});

export const { setByTrackedSubjects, setTrackedSubjectBills, setAllSubjectBills, addBookmarkedBill, removeBookmarkedBill, removeAllBookmarks, setBookmarkedBills } = billsSlice.actions;
export default billsSlice.reducer