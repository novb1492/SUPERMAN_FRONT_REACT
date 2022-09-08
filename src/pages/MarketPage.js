import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParam } from "../etc/Jslib";
import { history } from "etc/History";

function Market() {
    let [url,setUrl]=useState(window.location.href);
    let{pn,an}=useParams();
    const pageTitle = "marketPage"
    useEffect(() => {
        const listenBackEvent = () => {
          if(window.location.href.includes('/market')){
            alert('a');
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
    },[url]);
    function changePage(num) {
        let page=getParam("page")*1+num;
        let changeUrl='/market/'+pn+'/'+an+'?page='+page+'&category='+(getParam("category"));
        window.history.pushState("", pageTitle,changeUrl);
        setUrl(changeUrl);
    }
    return(
        <div>
           {pn},{an}
           <button onClick={()=>{changePage(1);}}>+</button><button onClick={()=>{changePage(-1);}}>-</button>
        </div>
    )
}
export default Market;