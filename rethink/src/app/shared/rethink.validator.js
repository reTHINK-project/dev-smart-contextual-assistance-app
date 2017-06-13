"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var RethinkValidators = (function () {
    function RethinkValidators() {
    }
    RethinkValidators.contextName = function (contextualCommDataService) {
        return function (control) {
            var name = control.value.toLowerCase();
            return new Promise(function (resolve) {
                contextualCommDataService.getContext(name).subscribe(function (context) {
                    if (context) {
                        resolve({ 'exist': name });
                    }
                    else {
                        resolve(null);
                    }
                }, function (error) {
                    resolve(null);
                });
            });
        };
    };
    return RethinkValidators;
}());
exports.RethinkValidators = RethinkValidators;
//# sourceMappingURL=rethink.validator.js.map