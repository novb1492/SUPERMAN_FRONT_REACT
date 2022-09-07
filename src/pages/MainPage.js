import KakaoMap from "components/KakaoMap";
import { checkObj } from "etc/Jslib";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
function Main() {
    const [map, setMap] = useState(null);
    const [arr, setArr] = useState([]);
    let nameAndAddressArr = [];
    let makerArr = [];
    let onMouseIndexArr = [];
    const kMap = useRef();
    window.addEventListener('resize', resize);
    function resize() {
        kMap.current.resize(window.innerWidth, window.innerHeight);
    }
    function reciveMap(map) {
        setMap(map);
    }
    function xyToAddress() {
        let latlng = map.getCenter();
        let geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(latlng.La, latlng.Ma, searchMarket);
    }
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
        makerArr = [];
        nameAndAddressArr = [];
        setArr((state)=>{
            console.log(state);
            state=[];
            return state;
        });
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
    function clearSuperAndMarketMarkerArr() {
        for (let ii in makerArr) {
            if (onMouseIndexArr.indexOf(ii * 1) == -1) {
                makerArr[ii].setMap(null);
            }
        }
    }
    function displayPlaces(data) {
        for (let i in data) {
            // 마커가 지도 위에 표시되도록 설정합니다
            let pn = data[i].place_name;
            let an = data[i].address_name;
            let checkText = pn + "," + an;
            //이미 있는 장소는 제외
            if (!nameAndAddressArr.includes(checkText)) {
                nameAndAddressArr[nameAndAddressArr.length] = checkText;
                let marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(data[i].y, data[i].x)
                });
                marker.setMap(map);
                makerArr[makerArr.length] = marker;
                let arrTemp=arr;
                arrTemp[arrTemp.length]=data[i];
                setArr(arrTemp);
            }
        }
    }
    function displayPagination(pagination) {
        if (pagination.hasNextPage) {
            pagination.nextPage();
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
            <Swiper
                spaceBetween={50}
                slidesPerView={2.4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
             {
                arr.map((val)=>{
                    return <SwiperSlide key={val.id}>{val.place_name}</SwiperSlide>
                })
             }
            
            </Swiper>
            <KakaoMap ref={kMap} idName={'map'} height={window.innerHeight} width={window.innerWidth} key={'mainMap'} reciveMap={reciveMap}></KakaoMap>
        </div>
    )
}

export default Main;