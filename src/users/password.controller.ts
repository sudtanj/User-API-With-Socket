import { Body, Controller, Put, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SessionAuthGuard } from "./guards/session-auth.guard";
import { JWTAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./roles.decorator";
import { UserRole, UsersEntity } from "./users.entity";
import { Request } from "express";
import { ResponseFormatUtil } from "../utils/ResponseFormatUtil";

@Controller("/password")
export class PasswordController {
 constructor(private userService: UsersService) {
 }

 @Put("/")
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(UserRole.ADMIN, UserRole.USER)
 async updatePassword(
  @Req() req: Request,
  @Body() body: any
 ) {
  const user = req.user as UsersEntity;
  const result = await this.userService.updateUserPassword(user.email, body.password)
  return ResponseFormatUtil.success(result)
 }
}
