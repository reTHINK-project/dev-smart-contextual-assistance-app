"use strict";
var router_1 = require("@angular/router");
var CustomURLSerializer_1 = require("./CustomURLSerializer");
// @NgModule({
//   declarations: [ TimeElapsedPipe ],
//   imports: [ CommonModule],
//   exports: [ TimeElapsedPipe ]
// })
exports.CustomUtils = [{ provide: router_1.UrlSerializer, useClass: CustomURLSerializer_1.CustomUrlSerializer }];
//# sourceMappingURL=CustomUtils.js.map