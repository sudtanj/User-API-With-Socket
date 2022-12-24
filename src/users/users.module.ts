import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { IsUserAlreadyExist } from './is-user-already-exist.validator';
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";

@Module({
 imports: [TypeOrmModule.forFeature([UsersEntity])],
 controllers: [UsersController],
 providers: [UsersService, IsUserAlreadyExist],
 exports: [UsersService],
})
export class UsersModule {}
