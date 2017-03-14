"use strict";
function strMapToObj(strMap) {
    var obj = Object.create(null);
    strMap.forEach(function (v, k) {
        obj[k] = v;
    });
    return obj;
}
exports.strMapToObj = strMapToObj;
function objToStrMap(obj) {
    var strMap = new Map();
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var k = _a[_i];
        strMap.set(k, obj[k]);
    }
    return strMap;
}
exports.objToStrMap = objToStrMap;
//# sourceMappingURL=utils.js.map