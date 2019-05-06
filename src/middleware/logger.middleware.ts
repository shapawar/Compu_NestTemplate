import { Injectable } from 'injection-js';
import { createLogger, format, Logger, LoggerOptions, transports } from 'winston';
import { TransformableInfo } from 'logform';
import winston = require('winston');


export enum LogLevel { INFO = 'info', WARN = 'warn', ERROR = 'error',DEBUG='debug' }


export const logTransportConsole = new transports.Console({
    handleExceptions: true,
    format: format.combine(
        format.timestamp(),
        format.printf((info: TransformableInfo) => {
            return `${info.timestamp} [${info.meta.context}] [${info.level.toLocaleUpperCase()}] ${info.message}`;
        })
    )
});




@Injectable()
export class LogService {
    private readonly logger: Logger;
    private contextName: string = 'NEST JS Logs';


    constructor() {

        if (process.env.NODE_ENV !== 'production') {

            this.logger = createLogger();
            this.logger.configure({
                transports: [logTransportConsole,
                    new winston.transports.File({
                        level: 'info',
                        filename: './logs/all-logs.log',
                        handleExceptions: true,
                        maxsize: 5242880, //5MB
                        maxFiles: 5
                    }),
                ],
                exitOnError: false
            });

        } else {

            this.logger = createLogger();
            this.logger.configure({

                transports: [
                    new winston.transports.File({
                        level: 'info',
                        filename: './logs/all-logs.log',
                        handleExceptions: true,
                        maxsize: 5242880, //5MB
                        maxFiles: 5
                    }),
                ],
                exitOnError: false
            });
        }
    }

    public configure(configuration: LoggerOptions, contextName?: string): void {
        this.logger.configure(configuration);
        this.contextName = contextName ? contextName : this.contextName;
    }

    public log(message: string): void {
        this.logger.log({ level: LogLevel.INFO, message: message, meta: { context: this.contextName } });
    }

    public error(message: string, stackTrace?: any): void {
        this.logger.log({ level: LogLevel.ERROR, message: message, meta: { context: this.contextName, stackTrace: stackTrace } });
    }

    public warn(message: string): void {
        this.logger.log({ level: LogLevel.WARN, message: message, meta: { context: this.contextName } });

    }

    public info(message: string): void {
        this.logger.log({ level: LogLevel.INFO, message: message, meta: { context: this.contextName } });
    }

    public debug(message: string): void {
        this.logger.log({ level: LogLevel.DEBUG, message: message, meta: { context: this.contextName } });
    }

}