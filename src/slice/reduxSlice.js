import { createSlice } from '@reduxjs/toolkit';

export const reduxSlice = createSlice({
    name: 'redux',
    initialState: {
        accessToken: '',
        isAuthorize: false,
        user: {},
    },
    reducers: {
        login: (state, action) => { //bingung
            state.accessToken = action.payload.accessToken;
            state.isAuthorize = true;
            state.user = action.payload.user;
        }
    }
}); 