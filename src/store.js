import { configureStore } from "@reduxjs/toolkit";
import PagingReducer from "reducers/PagingReducer";
import CartReducer from "reducers/CartReducer";

const store = configureStore({ reducer: {
    PagingReducer,
    CartReducer
} });

export default store;