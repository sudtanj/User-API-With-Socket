import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.MONGODB_URL,
      database: process.env.DATABASE_NAME,
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      useNewUrlParser: true,
      logging: true,
    }),
   UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
