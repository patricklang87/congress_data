import { createSlice } from '@reduxjs/toolkit';

const viewsSlice = createSlice({
    name: "views",
    initialState: {
        legislatorView: 'senate',
        dashFolder: 'Find Legislators',
        navVisible: true
    },
    reducers: {
        setLegislatorView: (state, action) => {
            state.legislatorView = action.payload;
        },
        setDashFolder: (state, action) => {
            state.dashFolder = action.payload;
        },
        toggleNavVisible: (state) => {
            state.navVisible = !state.navVisible;
        }
    }
});

export const { setLegislatorView, setDashFolder, toggleNavVisible } = viewsSlice.actions;
export default viewsSlice.reducer;