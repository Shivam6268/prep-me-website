import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice"
import question from "./auth/questionSlice"
const store = configureStore({
    reducer: {auth, question}
})


export default store