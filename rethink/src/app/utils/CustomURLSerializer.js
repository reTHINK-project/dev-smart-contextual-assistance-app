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
        var at = new RegExp(/%40/g);
        // use your regex to replace as per your requirement.
        return path.replace(at, '@');
    };
    return CustomUrlSerializer;
}());
exports.CustomUrlSerializer = CustomUrlSerializer;
//# sourceMappingURL=CustomURLSerializer.js.map