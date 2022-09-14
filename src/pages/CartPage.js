import CartButton from "components/cart/CartButton";
import CartList from "components/cart/CartList";
import NextAndBeforeButton from "components/page/NextBeforeButton";
import PageNumArea from "components/page/PageNumArea";
import { getParam } from "etc/Jslib";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestGet } from "reducers/PagingReducer";

function CartPage() {
    const [url, setUrl] = useState(window.location.href);
    const state = useSelector((state) => state.PagingReducer);
    const dispatch = useDispatch();
    const pageTitle = "cartPage";
    let changeUrl = (page) => {
        return `/cart/list/?page=${page}`;
    }
    let getCarts = (page) => {
        let requestUrl = `/cart/list?page=${page}`;
        dispatch(requestGet(requestUrl));
    }
    useEffect(() => {
        getCarts(getParam('page'));
    }, []);
    /**
   * 검색 혹은 페이징시 url 감지후 서버에게 재요청
   */
    useEffect(() => {
        getCarts(getParam("page"));
    }, [url]);
    /**
   * NextAndBeforeButton 에서 사용하는 페이징함수
   * @param {int} num 
   */
    function changePage(num) {
        let page = getParam("page") * 1 + num;
        let newUrl = changeUrl(page);
        window.history.pushState("", pageTitle, newUrl);
        setUrl(newUrl);
    }
    return (
        <div>
            <ul>
                {state.infoList.map(data => {
                    return <CartList data={data} key={data.id}></CartList>
                })}
            </ul>
            <CartButton></CartButton>
            <PageNumArea></PageNumArea>
            <NextAndBeforeButton clickFunction={changePage} num={1} text={'다음'} idName='nextButton'></NextAndBeforeButton>
            <NextAndBeforeButton clickFunction={changePage} num={-1} text={'이전'} idName='beforeButton'></NextAndBeforeButton>
        </div>

    )
}

export default CartPage;