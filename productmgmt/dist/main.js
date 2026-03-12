"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const appPort = configService.get('APP_PORT', 3000);
    const microservicePort = configService.get('MICROSERVICE_PORT', 3003);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: microservicePort,
        },
    });
    await app.startAllMicroservices();
    await app.listen(appPort);
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Microservice is listening on port: ${microservicePort}`);
}
bootstrap();
//# sourceMappingURL=main.js.map