import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

require("dotenv").config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { useContainer } from "class-validator";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
   new ValidationPipe({
     transform: true,
     whitelist: true,
     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
   }),
  );

  app.use(cookieParser(process.env.APP_SECRET));

  app.use(
   session({
     secret: process.env.APP_SECRET as string,
     resave: false,
     saveUninitialized: false,
     store: new session.MemoryStore(),
     cookie: {
       httpOnly: true,
       signed: true,
       sameSite: 'strict',
       secure: process.env.NODE_ENV === 'production',
     },
   }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

 // Add api documentation
 const baseUrl = "http://localhost:3000";
 const config = new DocumentBuilder()
  .setTitle('User API With Socket')
  .setVersion('1.0')
  .addServer(baseUrl)
  .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('docs', app, document, {
  swaggerOptions: {
   persistAuthorization: true,
  },
  customSiteTitle: 'User API With Socket 1.0',
 });

  await app.listen(3000);
}
bootstrap();
