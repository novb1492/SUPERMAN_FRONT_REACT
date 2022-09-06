const { useEffect, useState } = require("react")

function KakaoMap({idName,width,height,reWidth,reHeight,lat,lon}) {
    const[map,setMap]=useState(null);
    useEffect(()=>{
        var container = document.getElementById(idName);
        var options = {
          center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
          level: 3
        };
        var map = new window.kakao.maps.Map(container, options);
        setMap(map);
    },[]);
    function getMap() {
        return map;
    }
    return(
        <div id={idName} style={{width:width+"px", height:height+"px"}}></div>
    )
}
export default KakaoMap;