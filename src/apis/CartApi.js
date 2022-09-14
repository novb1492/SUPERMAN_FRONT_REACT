import { instance, setInterceptors } from "apis/Request";

function requestDeleteCart(ids) {
    setInterceptors(instance);
    return  instance.delete('/cart',{data: { ids}});
}
function requestChangeCount(data) {
    setInterceptors(instance);
    return  instance.put('/cart',data);
}
export {
    requestDeleteCart,
    requestChangeCount
}
