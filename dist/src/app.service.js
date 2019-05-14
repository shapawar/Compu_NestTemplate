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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const moment = require("moment");
const logger_middleware_1 = require("./middleware/logger.middleware");
const errorcodes_service_1 = require("./errorcodes/errorcodes.service");
let AppService = class AppService {
    constructor(logger, errorService) {
        this.logger = logger;
        this.errorService = errorService;
        this.taskName = "AppService";
        this.MODULENAME = "AppService";
    }
    getHello() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'Hello World!';
        });
    }
    endMetaData(evUniqueID, errCode, errMsg, metadata, task) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("check ponint 1");
            try {
                const errorData = yield this.errorService.getErrorInformation(evUniqueID, errCode, errMsg);
                metadata.errCode = errorData.code;
                metadata.errMsg = errorData.message;
                metadata.elapsedTimeInMS = moment(Date.now()).diff(metadata.requestTS, 'milliseconds');
                metadata.tasks[metadata.tasks.push({
                    name: task.name,
                    info: task.info,
                    startTS: Date.now(),
                    elapsedTimeInMS: this.endTask(Date.now())
                }) - 1];
                return metadata;
            }
            catch (error) {
                this.logger.error(`[${evUniqueID}](${this.MODULENAME})-${this.taskName}`);
                this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${this.taskName}`);
                throw error;
            }
        });
    }
    endTask(startTS) {
        return moment(Date.now()).diff(startTS, 'milliseconds');
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [logger_middleware_1.LogService, errorcodes_service_1.ErrorcodesService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map