"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
require("dotenv/config");
const bodyParser = require("body-parser");
const errorhandler_middleware_1 = require("./middleware/errorhandler.middleware");
const logger_middleware_1 = require("./middleware/logger.middleware");
const port = process.env.PORT || 9001;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        logger: new logger_middleware_1.LogService(),
            app.use(bodyParser.json());
        app.setGlobalPrefix('api/v1');
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
        app.useGlobalFilters(new errorhandler_middleware_1.ErrorFilter());
        yield app.listen(port);
        common_1.Logger.log(`APIVERSION = ${process.env.APIVERSION}`);
        common_1.Logger.log(`PORT = ${port}`);
        common_1.Logger.log(`NODE_ENV = ${process.env.NODE_ENV}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map