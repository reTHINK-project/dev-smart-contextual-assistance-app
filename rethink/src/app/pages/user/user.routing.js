"use strict";
// Components
var user_component_1 = require('../user/user.component');
exports.userRoutes = [
    {
        path: 'user/:user',
        component: user_component_1.UserComponent,
        resolve: {
            user: { user: 'user' }
        }
    },
];
//# sourceMappingURL=user.routing.js.map