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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const logger_middleware_1 = require("../middleware/logger.middleware");
let PingController = class PingController {
    constructor(logger, appService) {
        this.logger = logger;
        this.appService = appService;
        this.taskName = "PingController";
        this.MODULENAME = "PINGCONTROLLER";
    }
    ping(req) {
        this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${this.taskName}`);
        const task = {
            name: this.taskName,
            info: "Ping controller executed"
        };
        let pingdata = this.appService.endMetaData(req.evUniqueID, 0, 'Submitted Successfully', req.metadata, task);
        return pingdata;
    }
};
__decorate([
    common_1.Get(),
    common_1.HttpCode(200),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PingController.prototype, "ping", null);
PingController = __decorate([
    common_1.Controller('ping'),
    __metadata("design:paramtypes", [logger_middleware_1.LogService, app_service_1.AppService])
], PingController);
exports.PingController = PingController;
//# sourceMappingURL=ping.controller.js.map