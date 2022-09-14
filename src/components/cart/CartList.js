import { requestChangeCount } from "apis/CartApi";
import { checkNew, errorHandle } from "etc/Jslib";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCheckBox from "./CartCheckBox";

function CartList({data}) {
    const [count, setCount] = useState(data.count);
    const state = useSelector((state) => state.CartReducer);
    async function changeCount(event) {
        if(event.nativeEvent.inputType==='deleteContentBackward'){
            setCount(event.target.value);
            return;
        }
        let reCount=event.target.value;
        try {
            let response = await requestChangeCount({count:reCount,id:data.id});
            doneChage(reCount,response.data);
        } catch (error) {
            let errorResponse = error.response;
            let responseData = errorResponse.data;
            if (checkNew(errorResponse.status, responseData.message)) {
                try {
                    let response = await requestChangeCount({count:reCount,id:data.id});
                    doneChage(reCount,response.data);
                } catch (error) {
                    errorHandle(error);
                }
            } else {
                errorHandle(error);
            }
        }
    }
    function doneChage(count,data) {
        console.log(data.message);
        setCount(count);
    }
    return (
        <li>
            {JSON.stringify({data})}
            <input type="number" value={count} min="1" onChange={(e)=>{changeCount(e)}}></input>
            <CartCheckBox id={data.id} key={data.id}></CartCheckBox>
        </li>
    )
}

export default CartList;