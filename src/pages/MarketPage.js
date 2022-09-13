import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getParam } from "../etc/Jslib";
import { history } from "etc/History";
import { useSelector, useDispatch } from "react-redux";
import { requestGet } from "reducers/PagingReducer";
import NextAndBeforeButton from "components/page/NextBeforeButton";
import PageNumArea from "components/page/PageNumArea";
import MarketSearchArea from "components/market/MarketSearchArea";
import ProductList from "components/market/ProductList";
function Market() {
  const [url, setUrl] = useState(window.location.href);
  const { pn, an } = useParams();
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
  const pageTitle = "marketPage";
  let changeUrl = (category, keyword, page) => {
    return `/market/${pn}/${an}?page=${page}&category=${category}&keyword=${keyword}`;
  }
  let getProducts = (page, keyword, category) => {
    let requestUrl = `/product/list/${an}/${pn}?page=${page}&category=${category}&keyword=${keyword}`;
    dispatch(requestGet(requestUrl));
  }
  /**
   * 뒤로 앞으로가기 버튼 대응
   */
  useEffect(() => {
    const listenBackEvent = () => {
      if (window.location.href.includes('/market')) {
        getProducts(getParam("page"), getParam("keyword"), getParam("category"));
      }
    };
    const unlistenHistoryEvent = history.listen(({ action }) => {
      if (action === "POP") {
        listenBackEvent();
      }
    });
    return unlistenHistoryEvent;
  }, []);
  /**
   * 검색 혹은 페이징시 url 감지후 서버에게 재요청
   */
  useEffect(() => {
    getProducts(getParam("page"), getParam("keyword"), getParam("category"));
  }, [url]);
  /**
   * NextAndBeforeButton 에서 사용하는 페이징함수
   * @param {int} num 
   */
  function changePage(num) {
    let page = getParam("page") * 1 + num;
    let newUrl = changeUrl(getParam("category"), getParam("keyword"), page);
    window.history.pushState("", pageTitle, newUrl);
    setUrl(newUrl);
  }
  /**
   * MarketSearchArea 검색 컴포넌트에서 사용하는 함수
   * @param {string} keyword 
   * @param {int} category 
   */
  function searchFun(keyword, category) {
    let newUrl = changeUrl(category, keyword, 1);
    window.history.pushState("", pageTitle, newUrl);
    setUrl(newUrl);
  }
  return (
    <div>{state.PagingReducer.infoList.map(data => {
      return <ProductList data={data} key={data.id}></ProductList>
    })}
      <PageNumArea></PageNumArea>
      <NextAndBeforeButton clickFunction={changePage} num={1} text={'다음'} idName='nextButton'></NextAndBeforeButton>
      <NextAndBeforeButton clickFunction={changePage} num={-1} text={'이전'} idName='beforeButton'></NextAndBeforeButton>
      <MarketSearchArea searchFun={searchFun}></MarketSearchArea>
    </div>
  )
}
export default Market;