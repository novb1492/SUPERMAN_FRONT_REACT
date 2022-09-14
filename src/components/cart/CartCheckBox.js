import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "reducers/CartReducer";

function CartCheckBox({id}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.CartReducer);
    const check = useRef();
    useEffect(()=>{
        /**
         * 페이징시 해당 체크박스가 있는지 검사
         * *1안붙히면 문자열로 인식 이래서 타입스크립스 써야한다
         */
        if(state.deleteArr.indexOf(check.current.value*1)!==-1){
            check.current.checked=true;
        }
    },[])
    return (
        <input type="checkbox" ref={check} value={id} onClick={()=>{ dispatch(CartAction.changeDeleteArr({id:id}))}}></input>
    )
}

export default CartCheckBox;