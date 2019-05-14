import { LoggerOptions } from 'winston';
export declare enum LogLevel {
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DEBUG = "debug"
}
export declare class LogService {
    private readonly logger;
    private contextName;
    constructor();
    configure(configuration: LoggerOptions, contextName?: string): void;
    log(message: string): void;
    error(message: string, stackTrace?: any): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
}
