import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { IsUserAlreadyExist } from './is-user-already-exist.validator';
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { SessionSerializer } from "./session.serializer";
import { LoginController } from "./login.controller";
import { PasswordController } from "./password.controller";

@Module({
 imports: [
  TypeOrmModule.forFeature([UsersEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
   secret: process.env.APP_SECRET,
   signOptions: {
    expiresIn: '1d',
    algorithm: 'HS384',
   },
   verifyOptions: {
    algorithms: ['HS384'],
   },
  }),
 ],
 controllers: [UsersController, LoginController, PasswordController],
 providers: [UsersService, IsUserAlreadyExist, LocalStrategy, JwtStrategy, SessionSerializer],
 exports: [UsersService],
})
export class UsersModule {}
