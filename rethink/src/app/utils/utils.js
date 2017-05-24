"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    try {
        for (var _a = __values(Object.keys(obj)), _b = _a.next(); !_b.done; _b = _a.next()) {
            var k = _b.value;
            strMap.set(k, obj[k]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return strMap;
    var e_1, _c;
}
exports.objToStrMap = objToStrMap;
function getUserMedia(constraints) {
    return new Promise(function (resolve, reject) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
            resolve(mediaStream);
        }); /*.catch((reason:any) => {
          reject(reason);
        });*/
    });
}
exports.getUserMedia = getUserMedia;
function normalizeName(name) {
    var prefix = 'sca';
    var normalized = {};
    var splited = [];
    if (name.indexOf('-') !== -1) {
        splited = name.split('-');
    }
    else if (name.indexOf('/') !== -1) {
        splited = name.split('/').slice(0, 1);
    }
    else {
        splited.push(prefix);
        splited.push(name);
    }
    console.log('Splited: ', name, splited);
    var context = splited[0] + '-' + splited[1];
    var task = splited[2] ? splited[2] : null;
    var user = splited[3] && splited[4] ? splited[3] + '-' + splited[4] : null;
    if (context) {
        normalized['id'] = context;
        normalized['name'] = splited[1];
        normalized['parent'] = null;
    }
    if (task) {
        normalized['id'] = context + '-' + task;
        normalized['name'] = task;
        normalized['parent'] = context;
    }
    if (user) {
        normalized['id'] = context + '-' + task + '-' + user;
        normalized['name'] = user;
        normalized['parent'] = task;
    }
    return normalized;
}
exports.normalizeName = normalizeName;
//# sourceMappingURL=utils.js.map