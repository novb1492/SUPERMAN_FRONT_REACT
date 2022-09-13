import KakaoMap from "components/KakaoMap";
import { checkObj } from "etc/Jslib";
import { useEffect, useRef, useState } from "react";
import MainSw from "components/MainSw";
import { useNavigate } from "react-router-dom";

function Main() {
    const [map, setMap] = useState(null);
    let nameAndAddressArr = [];
    let markerArr = [];
    let onMouseIndexArr = [];
    let arr=[];
    const kMap = useRef();
    const sw = useRef();
    let navigate = useNavigate();
    /**
     * 리사이즈 이벤트 추가
     * 자식 컴포넌트(KakaoMap)호출 후 리사이즈 한다
     */
    window.addEventListener('resize', resize);
    function resize() {
        kMap.current.resize(window.innerWidth, window.innerHeight);
    }
    /**
     * KakaoMap컴포넌트에서 map을 생성해서 주면
     * 받아서 저장 
     * @param {obj} map 
     */
    function reciveMap(map) {
        setMap(map);
    }
    /**
     * 지도의 중심좌표를 구한한뒤 근처 매장 찾는 함수 호출
     */
    function xyToAddress() {
        let latlng = map.getCenter();
        let geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(latlng.La, latlng.Ma, searchMarket);
    }
    /**
     * 카카오가 제공해주는 키워드 검색 사용
     * @param {*} result 
     * @param {*} status 
     * @returns 
     */
    function searchMarket(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
            //키워드로 검색 ex) 서울 동작구 마트
            let address = result[0].address;
            let text = address.region_1depth_name + ' ' + address.region_2depth_name + ' ' + address.region_3depth_name;
            let keywords = [text + ' 마트', text + ' 슈퍼', text + ' 슈퍼마켓', text + ' 상회'];
            clearSuperAndMarketMarkerArr();
            reset();
            search(keywords);
            return;
        }
    }
    function reset() {
        markerArr = [];
        nameAndAddressArr = [];
        arr=[];
    }
    function search(keywords) {
        let ps = new window.kakao.maps.services.Places();
        for (var i in keywords) {
            ps.keywordSearch(keywords[i], setAllData);
        }
    }
    function setAllData(data, status, pagination) {
        if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
            // 페이지 번호를 표출합니다
            displayPagination(pagination);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }
    /**
     * 마커들 지우는 함수
     * 클릭한 마커는 냅두고 지운다
     */
    function clearSuperAndMarketMarkerArr() {
        for (let ii in markerArr) {
            if (onMouseIndexArr.indexOf(ii * 1) == -1) {
                markerArr[ii].setMap(null);
            }
        }
    }
    function displayPlaces(data) {
        for (let i in data) {
            // 마커가 지도 위에 표시되도록 설정합니다
            let pn = data[i].place_name.trim();
            let an = data[i].address_name.trim();
            let checkText = pn + "," + an;
            //이미 있는 장소는 제외
            if (!nameAndAddressArr.includes(checkText)) {
                //중복확인 위해 배열에 추가(키워드가 상호/마트등 4가지 이기 때문에 같은 카테고리로 같은 매장이 오는경우가 많음 ex)준영 마트 상회/마트 키워드 모두 있음)
                nameAndAddressArr[nameAndAddressArr.length] = checkText;
                let marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(data[i].y, data[i].x)
                });
                window.kakao.maps.event.addListener(marker, 'click', ()=> {
                    navigate('/market/'+pn+'/'+an+'?page=1&category=1000&keyword=');
                });
                marker.setMap(map);
                //마커 배열에 담기
                markerArr[markerArr.length] = marker;
                //슬라이드 바 표시위해 배열담기
                arr[arr.length]=data[i];
                //자식컴포넌트 호출 상단 슬라이드 바 만드는함수
                sw.current.changeArr(arr);
            }
        }
    }
    function displayPagination(pagination) {
        if (pagination.hasNextPage) {
            pagination.nextPage();
        }
    }
    /**
     * MainSw컴포넌트에서 클릭시
     * 오는 함수 중심 좌표이동 및 저장
     * @param {*} item 
     * @param {*} index 
     */
    function changeFocus(item,index){
        var x=item.x;
        var y=item.y;
        map.panTo(new window.kakao.maps.LatLng(y, x));
        if(onMouseIndexArr.indexOf(index)==-1){
            onMouseIndexArr[onMouseIndexArr.length]=index;
            let iwContent = '<div style="padding:5px;">'+item.place_name+'</div>';
            let iwRemoveable = true;
            let infowindow = new window.kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            infowindow.open(map, markerArr[index]);  
        }
    }
    useEffect(() => {
        if (!checkObj(map)) {
            window.kakao.maps.event.addListener(map, 'dragend', () => {//중심점 변경시(드래그)인근 마트들 검색
                xyToAddress();
            });
            xyToAddress();
        }
    }, [map]);
    return (
        <div>
            <MainSw ref={sw} changeFocus={changeFocus} ></MainSw>
            <KakaoMap ref={kMap} idName={'map'} height={window.innerHeight} width={window.innerWidth} key={'mainMap'} reciveMap={reciveMap}></KakaoMap>
        </div>
    )
}

export default Main;