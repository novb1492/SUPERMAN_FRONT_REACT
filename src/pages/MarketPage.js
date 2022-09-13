import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  getParam } from "../etc/Jslib";
import { history } from "etc/History";
import { useSelector,useDispatch } from "react-redux";
import {  requestGet} from "reducers/PagingReducer";
import NextAndBeforeButton from "components/page/NextBeforeButton";
import PageNumArea from "components/page/PageNumArea";
function Market() {
    const [url,setUrl]=useState(window.location.href);
    const {pn,an}=useParams();
    const state = useSelector((state) => state);
    const dispatch=useDispatch()
    const pageTitle = "marketPage";
    useEffect(() => {
        const listenBackEvent = () => {
          if(window.location.href.includes('/market')){
            getProducts(getParam("page"),getParam("keyword"),getParam("category"));
          }
        };
        const unlistenHistoryEvent = history.listen(({ action }) => {
          if (action === "POP") {
            listenBackEvent();
          }
        });
        return unlistenHistoryEvent;
      }, []);
    useEffect(()=>{
        getProducts(getParam("page"),getParam("keyword"),getParam("category"));
    },[url]);
    function changePage(num) {
        let page=getParam("page")*1+num;
        let changeUrl='/market/'+pn+'/'+an+'?page='+page+'&category='+(getParam("category"))+'&keyword='+(getParam("keyword"));
        window.history.pushState("", pageTitle,changeUrl);
        setUrl(changeUrl);
    }
    function getProducts(page,keyword,category) {
      let requestUrl='/product/list/'+an+'/'+pn+'?page='+page+'&category='+category+'&keyword='+keyword;
      dispatch( requestGet(requestUrl));
    }
    return(
        <div>
            {JSON.stringify(state.PagingReducer)}
            <PageNumArea></PageNumArea>
            <NextAndBeforeButton clickFunction={changePage} num={1} text={'다음'} idName='nextButton'></NextAndBeforeButton>
            <NextAndBeforeButton clickFunction={changePage} num={-1} text={'이전'} idName='beforeButton'></NextAndBeforeButton>
        </div>
    )
}
export default Market;