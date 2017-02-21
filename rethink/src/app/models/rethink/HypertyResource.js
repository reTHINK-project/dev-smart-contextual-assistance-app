"use strict";
(function (HypertyResourceType) {
    HypertyResourceType[HypertyResourceType["chat"] = 0] = "chat";
    HypertyResourceType[HypertyResourceType["audio"] = 1] = "audio";
    HypertyResourceType[HypertyResourceType["video"] = 2] = "video";
    HypertyResourceType[HypertyResourceType["av"] = 3] = "av";
    HypertyResourceType[HypertyResourceType["screen"] = 4] = "screen";
    HypertyResourceType[HypertyResourceType["file"] = 5] = "file";
    HypertyResourceType[HypertyResourceType["midi"] = 6] = "midi";
    HypertyResourceType[HypertyResourceType["activity_context"] = 7] = "activity_context";
    HypertyResourceType[HypertyResourceType["availability_context"] = 8] = "availability_context";
    HypertyResourceType[HypertyResourceType["location_context"] = 9] = "location_context";
    HypertyResourceType[HypertyResourceType["heart_rate_context"] = 10] = "heart_rate_context";
    HypertyResourceType[HypertyResourceType["user_steps_context"] = 11] = "user_steps_context";
    HypertyResourceType[HypertyResourceType["battery_context"] = 12] = "battery_context";
    HypertyResourceType[HypertyResourceType["sleep_context"] = 13] = "sleep_context";
    HypertyResourceType[HypertyResourceType["light_context"] = 14] = "light_context";
    HypertyResourceType[HypertyResourceType["humidity_context"] = 15] = "humidity_context";
    HypertyResourceType[HypertyResourceType["power"] = 16] = "power";
    HypertyResourceType[HypertyResourceType["user_activity_context"] = 17] = "user_activity_context";
    HypertyResourceType[HypertyResourceType["user_communication_context"] = 18] = "user_communication_context";
})(exports.HypertyResourceType || (exports.HypertyResourceType = {}));
var HypertyResourceType = exports.HypertyResourceType;
(function (direction) {
    direction[direction["in"] = 0] = "in";
    direction[direction["out"] = 1] = "out";
    direction[direction["inout"] = 2] = "inout";
})(exports.direction || (exports.direction = {}));
var direction = exports.direction;
//# sourceMappingURL=HypertyResource.js.map