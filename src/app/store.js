import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slice/loginSlice"
import trackReducer from "../slice/trackSlice";

export default configureStore({
    reducer: {
        login: loginReducer,
        track: trackReducer,
    },
})