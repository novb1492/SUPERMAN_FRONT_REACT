import { configureStore } from "@reduxjs/toolkit";
import PagingReducer from "reducers/PagingReducer";

const store = configureStore({ reducer: {
    PagingReducer
} });

export default store;