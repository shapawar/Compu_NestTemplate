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
const injection_js_1 = require("injection-js");
const winston_1 = require("winston");
const winston = require("winston");
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "info";
    LogLevel["WARN"] = "warn";
    LogLevel["ERROR"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.logTransportConsole = new winston_1.transports.Console({
    handleExceptions: true,
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf((info) => {
        return `${info.timestamp} [${info.meta.context}] [${info.level.toLocaleUpperCase()}] ${info.message}`;
    }))
});
let LogService = class LogService {
    constructor() {
        this.contextName = 'NEST JS Logs';
        if (process.env.NODE_ENV !== 'production') {
            this.logger = winston_1.createLogger();
            this.logger.configure({
                transports: [exports.logTransportConsole,
                    new winston.transports.File({
                        level: 'info',
                        filename: './logs/all-logs.log',
                        handleExceptions: true,
                        maxsize: 5242880,
                        maxFiles: 5
                    }),
                ],
                exitOnError: false
            });
        }
        else {
            this.logger = winston_1.createLogger();
            this.logger.configure({
                transports: [
                    new winston.transports.File({
                        level: 'info',
                        filename: './logs/all-logs.log',
                        handleExceptions: true,
                        maxsize: 5242880,
                        maxFiles: 5
                    }),
                ],
                exitOnError: false
            });
        }
    }
    configure(configuration, contextName) {
        this.logger.configure(configuration);
        this.contextName = contextName ? contextName : this.contextName;
    }
    log(message) {
        this.logger.log({ level: LogLevel.INFO, message: message, meta: { context: this.contextName } });
    }
    error(message, stackTrace) {
        this.logger.log({ level: LogLevel.ERROR, message: message, meta: { context: this.contextName, stackTrace: stackTrace } });
    }
    warn(message) {
        this.logger.log({ level: LogLevel.WARN, message: message, meta: { context: this.contextName } });
    }
    info(message) {
        this.logger.log({ level: LogLevel.INFO, message: message, meta: { context: this.contextName } });
    }
};
LogService = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=logger.middleware.js.map