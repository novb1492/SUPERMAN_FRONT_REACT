import { createSlice } from "@reduxjs/toolkit";


let init = {
    deleteArr: []
}
const CartSlice = createSlice({
    name: 'CartSlice',
    initialState: init,
    reducers: {
        changeDeleteArr(state, action) {
            let payload = action.payload;
            let arr=state.deleteArr;
            let index=arr.indexOf(payload.id);
            if(index===-1){
                state.deleteArr=[...arr,payload.id];
            }else{
                arr.splice(index,1);
                state.deleteArr=arr;
            }
        },
        clearArr(state){
            state.deleteArr=[];
        }
    }
})
export default CartSlice.reducer;
export const CartAction = CartSlice.actions;