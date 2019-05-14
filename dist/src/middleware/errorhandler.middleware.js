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
const logger_middleware_1 = require("./logger.middleware");
const app_service_1 = require("../app.service");
let ErrorFilter = class ErrorFilter {
    constructor(appService) {
        this.appService = appService;
        this.MODULENAME = "ERRORHANDLER";
    }
    catch(error, host) {
        return __awaiter(this, void 0, void 0, function* () {
            let debugName = 'Error-Middleware';
            let logger = new logger_middleware_1.LogService();
            let response = host.switchToHttp().getResponse();
            let request = host.switchToHttp().getRequest();
            let status = (error instanceof common_1.HttpException) ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            if (request.url == "/favicon.ico") {
                logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);
                logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);
                return;
            }
            request.metadata.errMsg = error.message;
            request.metadata.errCode = 1;
            request.timestamp = new Date().toISOString();
            logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
            logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
            let responseobj = yield this.myFunction(request.evUniqueID, 1, error.message, request.metadata, 'Error_handler');
            console.log("bcdksbckehb   =", responseobj);
            return response.status(status).json(request.metadata);
        });
    }
    myFunction(evUniqueID, errCode, errMsg, metadata, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getresobj = yield this.appService.getHello();
                console.log(getresobj);
                return getresobj;
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
};
ErrorFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=errorhandler.middleware.js.map