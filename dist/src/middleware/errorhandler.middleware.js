"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ErrorFilter = class ErrorFilter {
    catch(error, host) {
        let response = host.switchToHttp().getResponse();
        let request = host.switchToHttp().getRequest();
        let metadata = {
            metadata: response.locals.apiMeta,
            statusCode: 0,
            errorname: '',
            message: '',
            params: request.params,
            body: request.body,
            timestamp: new Date().toISOString()
        };
        metadata.statusCode = (error instanceof common_1.HttpException) ? error.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        ;
        metadata.message = error.message;
        ;
        metadata.errorname = error.name;
        return response.status(metadata.statusCode).json(metadata);
    }
};
ErrorFilter = __decorate([
    common_1.Catch()
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=errorhandler.middleware.js.map