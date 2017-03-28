"use strict";
var CommunictionStatus;
(function (CommunictionStatus) {
    CommunictionStatus[CommunictionStatus["Open"] = 0] = "Open";
    CommunictionStatus[CommunictionStatus["Pending"] = 1] = "Pending";
    CommunictionStatus[CommunictionStatus["Closed"] = 2] = "Closed";
    CommunictionStatus[CommunictionStatus["Paused"] = 3] = "Paused";
    CommunictionStatus[CommunictionStatus["Failed"] = 4] = "Failed";
})(CommunictionStatus = exports.CommunictionStatus || (exports.CommunictionStatus = {}));
//# sourceMappingURL=Communication.js.map