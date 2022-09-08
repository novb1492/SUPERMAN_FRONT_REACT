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