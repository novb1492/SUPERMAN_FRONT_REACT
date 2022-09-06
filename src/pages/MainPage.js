import KakaoMap from "components/KakaoMap";

function Main() {
    return(
        <div>
            main
            <KakaoMap idName={'map'} height={500} width={1000} key={'mainMap'}></KakaoMap>
        </div>
    )
}

export default Main;