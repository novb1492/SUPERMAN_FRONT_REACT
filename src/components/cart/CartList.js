import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCheckBox from "./CartCheckBox";

function CartList({data}) {
    const [count, setCount] = useState(data.count);
    const state = useSelector((state) => state.CartReducer);
    return (
        <li>
            {JSON.stringify({data})}
            <input type="number" value={count} min="1" onChange={(e)=>{setCount(e.target.value);}}></input>
            <CartCheckBox id={data.id} key={data.id}></CartCheckBox>
        </li>
    )
}

export default CartList;