const { useEffect, useState, useRef, useImperativeHandle, forwardRef } = require("react")
/**
 * 
 * @param {*} param0 
 * @returns 
 */
function KakaoMap(prop, ref) {
    const kMap = useRef();
    useImperativeHandle(ref, () => ({
        // 부모 컴포넌트에서 사용할 함수를 선언
        resize
      }))
    function resize(width,height) {
        var domMap=kMap.current;
        domMap.style.width=width+'px';
        domMap.style.height=height+'px';
    }
    useEffect(()=>{
        let container = document.getElementById(prop.idName);
        let options = {
          center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
          level: 3
        };
        let mapInit = new window.kakao.maps.Map(container, options);
        prop.reciveMap(mapInit);
    },[]);
    function resize() {
        var domMap=kMap.current;
        domMap.style.width=window.innerWidth+'px';
        domMap.style.height=window.innerHeight+'px';
    }
    return(
        <div id={prop.idName} ref={kMap} style={{width:prop.width+"px", height:prop.height+"px"}}></div>
    )
}
export default forwardRef(KakaoMap);