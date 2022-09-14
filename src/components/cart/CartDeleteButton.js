import { requestDeleteCart } from "apis/CartApi";
import { checkNew, errorHandle } from "etc/Jslib";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "reducers/CartReducer";

function CartDeleteButton() {
    const state = useSelector((state) => state.CartReducer);
    const dispatch = useDispatch();
    async function requestDelete() {
        try {
            let response = await requestDeleteCart(state.deleteArr);
            doneDelete(response.data);
        } catch (error) {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                try {
                    let response = await requestDeleteCart(state.deleteArr);
                    doneDelete(response.data);
                } catch (error) {
                    errorHandle(error);
                }
            } else {
                errorHandle(error);
            }
        }
    }
    function doneDelete(data) {
        alert(data.message);
        dispatch(CartAction.clearArr());
        window.location.reload();
    }
    return (
        <button onClick={()=>{requestDelete()}}>삭제</button>
    )
}

export default CartDeleteButton;