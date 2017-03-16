"use strict";
(function (CommunictionStatus) {
    CommunictionStatus[CommunictionStatus["Open"] = 0] = "Open";
    CommunictionStatus[CommunictionStatus["Pending"] = 1] = "Pending";
    CommunictionStatus[CommunictionStatus["Closed"] = 2] = "Closed";
    CommunictionStatus[CommunictionStatus["Paused"] = 3] = "Paused";
    CommunictionStatus[CommunictionStatus["Failed"] = 4] = "Failed";
})(exports.CommunictionStatus || (exports.CommunictionStatus = {}));
var CommunictionStatus = exports.CommunictionStatus;
//# sourceMappingURL=Communication.js.map