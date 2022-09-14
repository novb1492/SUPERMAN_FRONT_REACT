import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "reducers/CartReducer";

function CartCheckBox({id}) {
    const dispatch = useDispatch();
    return (
        <input type="checkbox" value={id} onClick={()=>{dispatch(CartAction.changeDeleteArr({id:id}))}}></input>
    )
}

export default CartCheckBox;