import { createSlice } from "@reduxjs/toolkit";
import { requestProductList } from "../apis/MarketApi";
import { checkNew, errorHandle } from "../etc/Jslib";

let init={
    weight:0,
    doneFlag: false,
    infoList: [],
    totalPage: 0,
    last: false,
    first: false,
    empty: false,
    nowPage: 0
}
const PagingSlice=createSlice({
    name:'reducer',
    initialState:init,
    reducers:{
        setInfo(state,action){
            let payload=action.payload;
            state.infoList=payload.content;
        },
        minus(state,action){
            state.weight=state.weight-action.payload.value;
        }
    }
})
export default PagingSlice.reducer;
export const PagingAction=PagingSlice.actions;