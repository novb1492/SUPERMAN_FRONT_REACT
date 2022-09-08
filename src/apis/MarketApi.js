import { instance, setInterceptors } from "apis/Request";

function requestProductList(url) {
    setInterceptors(instance);
    return  instance.get(url);
}

export {
    requestProductList
}
