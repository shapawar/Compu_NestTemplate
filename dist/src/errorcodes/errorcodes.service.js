"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const general_errocodes_config_1 = require("./general.errocodes.config");
const logger_middleware_1 = require("../middleware/logger.middleware");
let ErrorcodesService = class ErrorcodesService {
    constructor(generalcodes) {
        this.generalcodes = generalcodes;
        this.taskName = "ErrorCodesService";
        this.MODULENAME = "ErrorCodesController";
    }
    getErrorInformation(evUniqueID, errCode, errMsg) {
        let logger = new logger_middleware_1.LogService();
        try {
            let errorData = this.generalcodes.ErrorCodes;
            const eCode = parseInt(errCode);
            const filtered = errorData.filter((item) => {
                return (item.code === eCode);
            });
            if (filtered.length > 0) {
                const filteredItem = filtered[0];
                if (filteredItem.canOverrideMessage) {
                    errMsg = errMsg || filteredItem.message;
                    if (errMsg === '') {
                        errMsg = filteredItem.message;
                    }
                }
                else {
                    errMsg = filteredItem.message;
                }
                const errInfo = filteredItem;
                errInfo.message = errMsg;
                return errInfo;
            }
            else {
                throw new Error(`Unknown error code: ${errCode}`);
            }
        }
        catch (error) {
            logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${this.taskName}): ${error.message}`);
            logger.error(`[${evUniqueID}] ${this.MODULENAME}(${this.taskName}): ${error.message}`);
            return { "code": 1, "message": 'Internal Error', "description": error.message, "type": 'ERROR', "canOverrideMessage": false };
        }
    }
};
ErrorcodesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [general_errocodes_config_1.GeneralCodes])
], ErrorcodesService);
exports.ErrorcodesService = ErrorcodesService;
//# sourceMappingURL=errorcodes.service.js.map