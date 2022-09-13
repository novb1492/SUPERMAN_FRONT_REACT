import { instance, setInterceptors } from "apis/Request";

function requestInfo(url) {
    setInterceptors(instance);
    return  instance.get(url);
}

export {
    requestInfo
}
