import { requestDeleteCart } from "apis/CartApi";
import { checkNew, errorHandle } from "etc/Jslib";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartAction } from "reducers/CartReducer";

function CartDeleteButton() {
    const state = useSelector((state) => state.CartReducer);
    const userIdInput = useRef();
    const totalPriceInput = useRef();
    const midInput = useRef();
    const oidInput = useRef();
    const nameInput = useRef();


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
    function on_pay() {
        totalPriceInput.current.value=1000;
        userIdInput.current.value=1;
        rquestPg();
    }
    function rquestPg() {
        let myform = window.document.mobileweb;
        myform.action = "https://mobile.inicis.com/smart/payment/";
        myform.target = "_self";
        myform.submit();
    }
    return (
        <div>
            <button onClick={() => { requestDelete() }}>삭제</button>
            <form name="mobileweb" method="post" accept-charset="euc-kr">
                <input type="text" name="P_NEXT_URL" value="http://localhost/mobile/mx_rnext.asp" />
                <input type="text" name="P_INI_PAYMENT" value="CARD" />
                <input type="text" name="P_RESERVED" value="twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N" />
                <input type="text" ref={midInput} name="P_MID" value="INIpayTest" />
                <input type="text" ref={oidInput} name="P_OID" value="test_oid_123456" />
                <input type="text" ref={nameInput} name="P_GOODS" value="테스트상품" />
                <input type="text" ref={totalPriceInput} name="P_AMT" value="" />
                <input type="text" ref={userIdInput} name="P_UNAME" value="" />
                <button onClick={on_pay}>구매</button>
            </form>
        </div>
    )
}

export default CartDeleteButton;