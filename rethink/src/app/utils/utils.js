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
var config_1 = require("../config");
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
        }).catch(function (reason) {
            reject(reason);
        });
    });
}
exports.getUserMedia = getUserMedia;
function isAnUser(name) {
    console.log('isAnUser - name:', name);
    var users = [];
    if (name.indexOf('-') !== -1) {
        users = name.split('-');
    }
    else {
        users.push(name);
    }
    console.log('isAnUser - users:', users);
    var result = users.map(function (user) {
        var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        console.log('isAnUser:', pattern.test(user));
        return pattern.test(user);
    });
    console.log(result);
    return result[0] && result[1];
}
exports.isAnUser = isAnUser;
function normalizeName(name, parent) {
    var prefix = config_1.config.appPrefix;
    var splitChar = config_1.config.splitChar;
    var at = new RegExp(/%40/g);
    // Clear path from attributes
    if (name.indexOf('?') !== -1) {
        name = name.substring(0, name.lastIndexOf('?'));
    }
    name = name.toLowerCase();
    name = name.replace(at, '@');
    var normalized = {};
    var splited = [];
    if (name.indexOf('/') !== -1) {
        splited = name.split('/');
        splited[0] = prefix;
    }
    else {
        if (!parent) {
            splited.push(prefix);
        }
        splited.push(name);
    }
    if (parent) {
        var tmp1 = parent.split(splitChar);
        tmp1.reduceRight(function (prev, curr) {
            prev.unshift(curr);
            return prev;
        }, splited);
    }
    console.log('Splited: ', name, parent, splited);
    var userName = splited[3] === 'user' ? splited[4] : splited[3];
    var isTask = splited[2] === 'user' && isAnUser(splited[3]) ? false : true;
    if (!isTask) {
        userName = splited[3];
    }
    var contextId = splited[0] + splitChar + splited[1];
    var task = isTask ? splited[2] : null;
    var user = userName ? userName : null;
    if (contextId) {
        normalized['id'] = contextId;
        normalized['name'] = splited[1];
        normalized['parent'] = null;
    }
    if (task) {
        normalized['id'] = contextId + splitChar + task;
        normalized['name'] = task;
        normalized['parent'] = contextId;
    }
    if (user) {
        normalized['id'] = contextId + splitChar + (task ? task + splitChar : '') + user;
        normalized['name'] = user;
        normalized['parent'] = contextId + (task ? splitChar + task : '');
    }
    console.log('Normalized Path:', normalized);
    return normalized;
}
exports.normalizeName = normalizeName;
function splitFromURL(name, currentUser) {
    var splitChar = config_1.config.splitChar;
    var splited = name.split(splitChar);
    var result = {};
    var context = splited[1];
    var task = splited[2];
    var user = splited[3];
    if (context) {
        result['context'] = context;
    }
    if (task) {
        result['context'] = context;
        result['task'] = task;
    }
    if (user) {
        result['context'] = context;
        result['task'] = task;
        if (user.includes('@') && user.includes('-')) {
            var users = user.split('-');
            if (currentUser) {
                users.splice(users.indexOf(currentUser), 1);
            }
            result['user'] = users[0];
        }
    }
    return result;
}
exports.splitFromURL = splitFromURL;
function normalizeFromURL(path, username) {
    var splitChar = config_1.config.splitChar;
    var at = new RegExp(/%40/g);
    path = path.replace(at, '@');
    // Clear path from attributes
    if (path.indexOf('?') !== -1) {
        path = path.substring(0, path.lastIndexOf('?'));
    }
    var pathSplited = path.split('/');
    pathSplited[0] = config_1.config.appPrefix;
    if (path.includes('@') && username) {
        var lastIndex = pathSplited.length - 1;
        var last = pathSplited[lastIndex];
        var updated = last + '-' + username;
        pathSplited[lastIndex] = updated;
    }
    var joined = pathSplited.join(splitChar);
    console.log('AQUI:', path, username, pathSplited, joined);
    return joined;
}
exports.normalizeFromURL = normalizeFromURL;
function filterContextsByName(name, context) {
    if (name.includes('@')) {
        var users = name.split('-');
        var user1 = users[0];
        var user2 = users[1];
        var variation1 = user1 + '-' + user2;
        var variation2 = user2 + '-' + user1;
        if (context.name === variation1) {
            name = variation1;
        }
        else if (context.name === variation2) {
            name = variation2;
        }
    }
    console.log('[ContextualCommData Service] - getting Context By Name: ', context.name, name, context.name === name);
    return context.name === name;
}
exports.filterContextsByName = filterContextsByName;
//# sourceMappingURL=utils.js.map