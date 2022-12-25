import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";
import { CacheDecoratorModule } from "nest-cache-decorator";

@Module({
  imports: [
    CacheDecoratorModule.forRoot({
      application: {
        version: "1.0",
        name: "user-api-with-socket"
      },
      redis: {
        host: process.env.REDIS_HOST, // your redis host env variable,
        port:  Number.parseInt(process.env.REDIS_PORT), // your redis port env variable
        password: process.env.REDIS_PASSWORD,
        username: process.env.REDIS_USER
      },
      isGlobal: true,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.MONGODB_URL,
      database: process.env.DATABASE_NAME,
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      useNewUrlParser: true,
      logging: true,
    }),
   UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
