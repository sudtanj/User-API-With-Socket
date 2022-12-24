import { Body, Controller, HttpCode, HttpStatus, Put, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SessionAuthGuard } from "./guards/session-auth.guard";
import { JWTAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./roles.decorator";
import { UserRole, UsersEntity } from "./users.entity";
import { Request } from "express";
import { ResponseFormatUtil } from "../utils/ResponseFormatUtil";
import { ApiResponse } from "@nestjs/swagger";

@Controller("/password")
export class PasswordController {
 constructor(private userService: UsersService) {
 }

 @Put("/")
 @HttpCode(200)
 @ApiResponse({
  status: HttpStatus.OK,
  description: 'Success change password.',
  type: UsersEntity,
  headers: {
   Authorization: {
    description: "token user will be store here at the header authorization response",
    example: "Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0X3VzZXIiLCJpYXQiOjE2NzA3MzI1NTEsImV4cCI6MTY3MDgxODk1MX0.iw72t9fNF1_sAo_8Vpp7beGJZA46B7JD23Ey598jVni4jhtIjF0WD_akGjhVfgG5"
   }
  }
 })
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
