import { IsDefined, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
 @IsDefined()
 @IsString()
 @ApiProperty({ example: "john@example.com", description: 'email for login' })
 readonly email: string;

 @IsDefined()
 @IsNotEmpty()
 @MinLength(8)
 @ApiProperty({ example: "password", description: 'user password for login' })
 readonly password: string;
}
