import { requestInfo } from "apis/BasicApi";
import { requestSave } from "apis/MarketApi";
import { checkNew, errorHandle } from "etc/Jslib";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
    const { productid } = useParams();
    const [info, setInfo] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        requestGet();
    }, []);
    /**
     * 해당 상품 정보 조회
     */
    async function requestGet() {
        let url = `/product/${productid}`;
        try {
            let response = await requestInfo(url);
            doneGetInfo(response.data);
        } catch (error) {
            let response = error.response;
            let responseData = response.data;
            if (checkNew(response.status, responseData.message)) {
                try {
                    let response = await requestInfo(url);
                    doneGetInfo(response.data);
                } catch (error) {
                    errorHandle(error);
                }
            } else {
                errorHandle(error);
            }
        }
    }
    function doneGetInfo(data) {
        setInfo(data);
    }
    /**
     * 장바구니 담는 함수
     */
    async function saveAtCart() {
        try {
            let response=await requestSave({productId:productid,eventId:info.eventId,count:count});
            doneSave(response.data);
        } catch (error) {
            let errorResponse = error.response;
            let responseData = errorResponse.data;
            if (checkNew(errorResponse.status, responseData.message)) {
                try {
                    let response = await requestSave({productId:productid,eventId:info.eventId,count:count});
                    doneSave(response.data);
                } catch (error) {
                    errorHandle(error);
                }
            } else {
                errorHandle(error);
            }
        }
    }
    function doneSave(data) {
        alert(data.message);
    }
    return (
        <div>
            {JSON.stringify({ info })}
            <input type="number" min="1" value={count} onChange={(e) => {
                setCount(e.target.value);
            }} />
            <button onClick={()=>{saveAtCart();}}>장바구니 담기</button>
        </div>

    )
}

export default ProductDetailPage;