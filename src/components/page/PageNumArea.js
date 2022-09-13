import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function PageNumArea() {
    const state = useSelector((state) => state);
    const [nowPage,setNowPage]=useState(0);
    const [totalPage,setTotalPage]=useState(0);

    useEffect(()=>{
        let pagingReducer=state.PagingReducer;
        setNowPage(pagingReducer.nowPage);
        setTotalPage(pagingReducer.totalPage);
    },[state.PagingReducer]);
    return(
        <div>
            {nowPage}/{totalPage}
        </div>
    )
}

export default PageNumArea;