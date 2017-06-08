"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/toPromise");
var RethinkValidators = (function () {
    function RethinkValidators() {
    }
    RethinkValidators.contextName = function (contextualCommDataService) {
        return function (control) {
            var name = control.value;
            return new Promise(function (resolve) {
                contextualCommDataService.getContext(name).toPromise().then(function (result) {
                    console.log('COntext:', result);
                    if (result) {
                        resolve({ 'exist': name });
                    }
                    else {
                        resolve(null);
                    }
                }).catch(function (reason) {
                    console.log('Not found', reason);
                    resolve(null);
                });
            });
        };
    };
    return RethinkValidators;
}());
exports.RethinkValidators = RethinkValidators;
//# sourceMappingURL=rethink.validator.js.map