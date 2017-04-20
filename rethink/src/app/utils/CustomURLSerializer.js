"use strict";
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
        // use your regex to replace as per your requirement.
        return path.replace(/%40/g, '@');
    };
    return CustomUrlSerializer;
}());
exports.CustomUrlSerializer = CustomUrlSerializer;
//# sourceMappingURL=CustomURLSerializer.js.map