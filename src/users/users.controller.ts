import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { Role } from "./role.enum";
import { UsersEntity } from "./users.entity";
import { SignUp } from "./dto/sign-up.dto";
import { SessionAuthGuard } from "./guards/session-auth.guard";
import { JWTAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiBearerAuth()
@Controller("/users")
@ApiTags("Users")
export class UsersController {
 constructor(
  private userService: UsersService,
 ) {
 }

 @Get("/")
 @HttpCode(HttpStatus.OK)
 @ApiResponse({ status: 200, description: 'Success.', type: [UsersEntity] })
 @ApiOperation({ summary: 'list all user available. admin and user can access!' })
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(Role.Admin, Role.User)
 async list(): Promise<UsersEntity[]> {
  return this.userService.findAll({})
 }

 @Get("/:id")
 @HttpCode(HttpStatus.OK)
 @ApiResponse({ status: 200, description: 'Success.', type: UsersEntity })
 @ApiOperation({ summary: 'get detail of user. admin and user can access!' })
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(Role.Admin, Role.User)
 async detail(@Param("id") id: string) {
  return this.userService.findOne({
   where: {
    id
   }
  })
 }

 @Post('/')
 @HttpCode(HttpStatus.CREATED)
 @ApiResponse({ status: HttpStatus.CREATED, description: 'Success.', type: UsersEntity })
 @ApiOperation({ summary: 'create new user. admin can access!' })
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @Roles(Role.Admin)
 async register(@Body() signUp: SignUp): Promise<UsersEntity> {
  return this.userService.create(signUp)
 }

 @Patch("/:id")
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @ApiResponse({ status: HttpStatus.OK, description: 'Success.', type: UsersEntity })
 @ApiOperation({ summary: 'update existing user. admin can access!' })
 @Roles(Role.Admin)
 async update(@Param("id") id: string, @Body() body: UsersEntity) {
  return this.userService.update(id, body)
 }

 @Delete("/:id")
 @UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
 @ApiResponse({ status: HttpStatus.OK, description: 'Success.', type: UsersEntity })
 @ApiOperation({ summary: 'delete existing user. admin can access!' })
 @Roles(Role.Admin)
 async delete(@Param("id") id: string) {
  return this.userService.delete(id)
 }

}
