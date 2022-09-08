import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParam } from "../etc/Jslib";
import { history } from "etc/History";
import { requestProductList } from "../apis/MarketApi";

function Market() {
    let [url,setUrl]=useState(window.location.href);
    const {pn,an}=useParams();
    const pageTitle = "marketPage";
    console.log(pn);
    useEffect(() => {
        const listenBackEvent = () => {
          if(window.location.href.includes('/market')){
            console.log('button');
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
        console.log(url);
        getProducts(getParam("page"),getParam("keyword"),getParam("category"));
    },[url]);
    function changePage(num) {
        let page=getParam("page")*1+num;
        let changeUrl='/market/'+pn+'/'+an+'?page='+page+'&category='+(getParam("category"))+'&keyword='+(getParam("keyword"));
        window.history.pushState("", pageTitle,changeUrl);
        setUrl(changeUrl);
    }
    function getProducts(page,keyword,category) {
        requestProductList({page:page,keyword:keyword,category:category,an:an,pn:pn}).then(response=>{
            console.log(response);
        });
    }
    return(
        <div>
           {pn},{an}
           <button onClick={()=>{changePage(1);}}>+</button><button onClick={()=>{changePage(-1);}}>-</button>
        </div>
    )
}
export default Market;