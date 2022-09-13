import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function NextAndBeforeButton({clickFunction,num,text,idName}) {
    const state = useSelector((state) => state);
    const buttonRef = useRef();

    useEffect(()=>{
        let pagingReducer=state.PagingReducer;
        checkStart(pagingReducer);
        checkEnd(pagingReducer);
       
    },[state.PagingReducer]);
    function checkStart(pagingReducer) {
        if(pagingReducer.first===true){
            if(buttonRef.current.id==='beforeButton'){
                buttonRef.current.disabled=true;
            }
        }else{
            if(buttonRef.current.id==='beforeButton'){
                buttonRef.current.disabled=false;
            }
        }
    }
    function checkEnd(pagingReducer) {
        if(pagingReducer.last){
            if(buttonRef.current.id==='nextButton'){
                buttonRef.current.disabled=true;
            }
        }else {
            if(buttonRef.current.id==='nextButton'){
                buttonRef.current.disabled=false;
            }
        }
    }
    return(
        <div>
            <button onClick={()=>{clickFunction(num);}} ref={buttonRef} id={idName}>{text}</button>
        </div>
    )
}

export default NextAndBeforeButton;