import KakaoMap from "components/KakaoMap";
import {  useRef } from "react";
function Main() {
    const kMap = useRef();
    window.addEventListener('resize',resize);
    function resize() {
        kMap.current.resize();
    }
    return(
        <div>
            main
            <KakaoMap ref={kMap} idName={'map'} height={500} width={1000} key={'mainMap'}></KakaoMap>
        </div>
    )
}

export default Main;