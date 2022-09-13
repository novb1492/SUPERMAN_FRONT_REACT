import { createSlice } from "@reduxjs/toolkit";
import { requestInfo } from "../apis/BasicApi";
import { checkNew, errorHandle } from "../etc/Jslib";

let init = {
    doneFlag: false,
    infoList: [],
    totalPage: 0,
    last: false,
    first: false,
    empty: false,
    nowPage: 0
}
const PagingSlice = createSlice({
    name: 'PagingSlice',
    initialState: init,
    reducers: {
        setInfo(state, action) {
            let payload = action.payload;
            state.infoList = payload.content;
            state.totalPage = payload.totalPages;
            state.last = payload.last;
            state.first = payload.first;
            state.empty = payload.empty;
            state.nowPage = payload.number + 1;
            if (!state.doneFlag) {
                state.doneFlag = true;
            }
        },
        minus(state, action) {
            state.weight = state.weight - action.payload.value;
        }
    }
})
export const requestGet = (url) => async (dispatch) => {
    try {
        let response = await requestInfo(url);
        dispatch(PagingSlice.actions.setInfo(response.data));
    } catch (error) {
        let response = error.response;
        let responseData = response.data;
        if (checkNew(response.status, responseData.message)) {
            try {
                let response = await requestInfo(url);
                dispatch(PagingSlice.actions.setInfo(response.data));
            } catch (error) {
                errorHandle(error);
            }
        } else {
            errorHandle(error);
        }
    }
};
export default PagingSlice.reducer;
export const PagingAction = PagingSlice.actions;