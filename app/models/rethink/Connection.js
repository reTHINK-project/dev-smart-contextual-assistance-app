"use strict";
(function (RTCIceConnectionState) {
    RTCIceConnectionState[RTCIceConnectionState['new'] = 0] = 'new';
    RTCIceConnectionState[RTCIceConnectionState['checking'] = 1] = 'checking';
    RTCIceConnectionState[RTCIceConnectionState['connected'] = 2] = 'connected';
    RTCIceConnectionState[RTCIceConnectionState['completed'] = 3] = 'completed';
    RTCIceConnectionState[RTCIceConnectionState['failed'] = 4] = 'failed';
    RTCIceConnectionState[RTCIceConnectionState['disconnected'] = 5] = 'disconnected';
    RTCIceConnectionState[RTCIceConnectionState['closed'] = 6] = 'closed';
})(exports.RTCIceConnectionState || (exports.RTCIceConnectionState = {}));
var RTCIceConnectionState = exports.RTCIceConnectionState;
//# sourceMappingURL=Connection.js.map