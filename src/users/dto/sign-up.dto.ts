import { IsDefined, IsEmail, IsIn, IsNotEmpty, IsString, MinLength, Validate, } from 'class-validator';
import { IsUserAlreadyExist } from '../is-user-already-exist.validator';
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../users.entity";

export class SignUp {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({ example: "John", description: 'name of the user' })
  readonly name: string;

  @IsDefined()
  @IsString()
  @Validate(IsUserAlreadyExist)
  @IsEmail()
  @ApiProperty({ example: "john@example.com", description: 'email for login' })
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: "password", description: 'user password for login' })
  readonly password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsIn(Object.values(UserRole))
  @ApiProperty({ example: "admin", description: 'User role' })
  readonly role: UserRole;
}
