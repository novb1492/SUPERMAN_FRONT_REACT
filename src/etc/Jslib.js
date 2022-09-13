export function checkObj(obj) {
    if(obj==undefined||obj==null){
        return true;
    }
    return false;
}
export function getParam(sname) {
    var params = window.location.search.substr(window.location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        var temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}
export function create2DArray(rows, columns) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(columns);
    }
    return arr;
}
/**
 * 시간이 지나고 
 * 뒤로/앞으로 가기 버튼 클릭시
 * 생기는 403에러 처리 함수
 */
export function BackButton403Error() {
    window.location.reload();
}
export function error500(error) {
    let data = error.response.data;
    alert(data.message);
}
/**
 * 에러 처리 하는 함수입니다
 * 물로 페이지별/에러상황별 정책이 다르지만
 * 혼자 만들다 보니 다 생각 하기 힘들어서
 * 한 함수에 몰아 놓고 alert정보만 하고 있습니다
 * @param {error} error 
 */
export function errorHandle(error){
    let response = error.response;
    console.log(response);
    if(response.status==400){
        show400ErrorList(error);
        return;
    }else if(response.status==403&&response.data.message==newTokenMessage()){
        BackButton403Error();
        return;
    }else if(response.status==500&&response.data.message=='리프레시 토큰 발급에 실패했습니다'){
        error403fail(error);
        return;
    }else if(response.status==500){
        error500(error);
        return;
    }

    alert(response.data.message);
}
/**
 * 무한 새로고침 연타시 
 * 토큰 교체 실패이슈 발생
 * @param {error} error 
 */
export function error403fail(error) {
    let data = error.response.data;
    alert(data.message);
    window.location.href='/login?nextUrl='+window.location.href;
}
export function newTokenMessage() {
    return '새토큰이 발급되었습니다';
}
export function show400ErrorList(error) {
    let errors = error.response.data.errors;
    let data = error.response.data;
    console.log(errors);
    if (errors == null || errors == undefined) {
        alert(data.message);
    } else {
        for (var i in errors) {
            alert(errors[i].defaultMessage);
        }
    }

}
/**
 * 리프레시토큰 유실 혹은 만료시
 * @param {int} state 
 * @param {string} message 
 * @returns 
 */
 export function checkexpireLogin(state, message) {
    if (state == 403 && message == '세션이 만료 되었습니다') {
        alert('로그인이 만료 되었습니다')
        return true;
    }
    return false;
}
/**
 * 예외 발생시
 * 해당 예외가 토큰 재발급 때문인지
 * 확인하는 함수
 * @param {int} state 
 * @param {string} message 
 * @returns 
 */
 export function checkNew(state, message) {
    if (state == 403 && message == newTokenMessage()) {
        return true;
    }
    return false;
}