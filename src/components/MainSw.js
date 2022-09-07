import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const {  useState, useImperativeHandle, forwardRef } = require("react")

function MainSw(prop, ref) {
    const [arr, setArr] = useState([]);
    useImperativeHandle(ref, () => ({
        // 부모 컴포넌트에서 사용할 함수를 선언
        changeArr
      }))
    function changeArr(arr) {
        setArr(arr);
    }
    return(
        <Swiper
                spaceBetween={50}
                slidesPerView={2.4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
             {
                arr.map((val,index)=>{
                    return <SwiperSlide key={val.id}>
                        <div  onClick={()=>{
                            prop.changeFocus(val,index);
                        }}>
                        {val.place_name}
                        </div>
                    </SwiperSlide>
                })
             }
            
            </Swiper>
    )
}
export default forwardRef(MainSw);