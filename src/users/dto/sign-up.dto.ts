import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Validate, IsString, IsIn,
} from 'class-validator';
import { IsUserAlreadyExist } from '../is-user-already-exist.validator';
import { Role } from "../role.enum";
import { ApiProperty } from "@nestjs/swagger";

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
  @IsIn(Object.values(Role))
  @ApiProperty({ example: "admin", description: 'User role' })
  readonly roles: Role;
}
