import { createSlice } from '@reduxjs/toolkit';

const viewsSlice = createSlice({
    name: "views",
    initialState: {
        legislatorView: 'sideBySide',
        dashFolder: 'Find Legislators'
    },
    reducers: {
        setLegislatorView: (state, action) => {
            state.legislatorView = action.payload;
        },
        setDashFolder: (state, action) => {
            state.dashFolder = action.payload;
        }
    }
});

export const { setLegislatorView, setDashFolder } = viewsSlice.actions;
export default viewsSlice.reducer;