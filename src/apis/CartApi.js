import { instance, setInterceptors } from "apis/Request";

function requestDeleteCart(ids) {
    setInterceptors(instance);
    return  instance.delete('/cart',{data: { ids}});
}
export {
    requestDeleteCart
}
