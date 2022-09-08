import { instance, setInterceptors } from "apis/Request";

function requestProductList(data) {
    setInterceptors(instance);
    return  instance.get('/product/list/'+data.an+'/'+data.pn+'?page='+data.page+'&category='+data.category+'&keyword='+data.keyword);
}

export {
    requestProductList
}
