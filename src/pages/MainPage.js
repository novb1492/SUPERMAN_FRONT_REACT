import KakaoMap from "components/KakaoMap";

function Main() {
    return(
        <div>
            main
            <KakaoMap idName={'map'} height={500} width={1000} key={'mainMap'} reHeight={100} reWidth={500}></KakaoMap>
        </div>
    )
}

export default Main;