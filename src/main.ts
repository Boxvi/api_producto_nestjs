import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v2");

  const config = new DocumentBuilder()
    .setTitle("PRODUCTOS API")
    .setDescription("API para la implementacion de una tienda fake")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.enableCors();

  SwaggerModule.setup("docs/v1", app, document);

  await app.listen(3100);
}

bootstrap();
