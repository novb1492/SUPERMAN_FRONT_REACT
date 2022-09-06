const { useEffect, useState, useRef } = require("react")
/**
 * 
 * @param {*} param0 
 * @returns 
 */
function KakaoMap({idName,width,height,reWidth,reHeight,lat,lon}) {
    const[map,setMap]=useState(null);
    const kMap = useRef();

    useEffect(()=>{
        let container = document.getElementById(idName);
        let options = {
          center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
          level: 3
        };
        let mapInit = new window.kakao.maps.Map(container, options);
        window.addEventListener('resize',resize);
        setMap(mapInit);

    },[]);
    function resize() {
        var domMap=kMap.current;
        domMap.style.width=window.innerWidth+'px';
        domMap.style.height=window.innerHeight+'px';
    }
    return(
        <div id={idName} ref={kMap} style={{width:width+"px", height:height+"px"}}></div>
    )
}
export default KakaoMap;