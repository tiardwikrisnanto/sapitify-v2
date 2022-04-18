import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        accessToken: '',
        isAuthorize: false,
    },
    reducers: {
        login: (state,action) => {
            state.accessToken = action.payload;
            state.isAuthorize = true;
        },
    }
}); 

export const { login } = loginSlice.actions;

export const selectAuthorize = (state) => state.login;

export default loginSlice.reducer;