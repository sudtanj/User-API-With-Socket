import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UsersEntity } from "../users/users.entity";
import { SignInDto } from "../users/dto/sign-in.dto";
import { UsersService } from "../users/users.service";

@Controller("/login")
export class LoginController {
 constructor(private userService: UsersService) {
 }

 @Post('/')
 @HttpCode(HttpStatus.OK)
 @ApiResponse({
  status: HttpStatus.OK,
  description: 'Success.',
  type: UsersEntity,
  headers: {
   Authorization: {
    description: "token user will be store here at the header authorization response",
    example: "Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0X3VzZXIiLCJpYXQiOjE2NzA3MzI1NTEsImV4cCI6MTY3MDgxODk1MX0.iw72t9fNF1_sAo_8Vpp7beGJZA46B7JD23Ey598jVni4jhtIjF0WD_akGjhVfgG5"
   }
  }
 })
 @ApiOperation({ summary: 'login and get user token!' })
 async login(@Body() user: SignInDto) {
  const userResult = await this.userService.login(user.email, user.password)
  const token = await this.userService.signToken(userResult)
  return {
   token,
   user: userResult
  }
 }
}
