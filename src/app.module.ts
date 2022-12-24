import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.MONGODB_URL,
      database: process.env.DATABASE_NAME,
    }),
   UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
