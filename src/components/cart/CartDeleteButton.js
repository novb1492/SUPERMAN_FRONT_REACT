import { useDispatch, useSelector } from "react-redux";

function CartDeleteButton() {
    const state = useSelector((state) => state.CartReducer);

    function requestDelete() {
        console.log(state);
    }
    return (
        <button onClick={()=>{requestDelete()}}>삭제</button>
    )
}

export default CartDeleteButton;