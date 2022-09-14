import { instance, setInterceptors } from "apis/Request";

function requestSave(data) {
    setInterceptors(instance);
    return  instance.post('/cart/save',data);
}
export {
    requestSave
}
