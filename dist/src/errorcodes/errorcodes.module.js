"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const errorcodes_service_1 = require("./errorcodes.service");
const errorcodes_controller_1 = require("./errorcodes.controller");
const general_errocodes_config_1 = require("./general.errocodes.config");
let ErrorcodesModule = class ErrorcodesModule {
};
ErrorcodesModule = __decorate([
    common_1.Module({
        providers: [errorcodes_service_1.ErrorcodesService, general_errocodes_config_1.GeneralCodes],
        controllers: [errorcodes_controller_1.ErrorcodesController],
        exports: [errorcodes_service_1.ErrorcodesService]
    })
], ErrorcodesModule);
exports.ErrorcodesModule = ErrorcodesModule;
//# sourceMappingURL=errorcodes.module.js.map