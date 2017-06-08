"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var CustomUrlSerializer = (function () {
    function CustomUrlSerializer() {
    }
    CustomUrlSerializer.prototype.parse = function (url) {
        var dus = new router_1.DefaultUrlSerializer();
        return dus.parse(url);
    };
    CustomUrlSerializer.prototype.serialize = function (tree) {
        var dus = new router_1.DefaultUrlSerializer(), path = dus.serialize(tree);
        var serializedPath = path;
        var at = new RegExp(/%40/g);
        var space = new RegExp(/%20/g);
        if (at) {
            serializedPath = path.replace(at, '@');
        }
        if (space) {
            serializedPath = path.replace(space, '-');
        }
        console.log('path:', path, serializedPath);
        // use your regex to replace as per your requirement.
        return serializedPath;
    };
    return CustomUrlSerializer;
}());
exports.CustomUrlSerializer = CustomUrlSerializer;
//# sourceMappingURL=CustomURLSerializer.js.map