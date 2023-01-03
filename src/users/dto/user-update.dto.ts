import { IsDefined, IsString, IsNotEmpty, IsEmail, IsIn } from 'class-validator';
import { UserRole } from "../users.entity";
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdate {
 @IsDefined()
 @IsString()
 @IsNotEmpty()
 @ApiProperty({ example: "John", description: 'name of the user' })
 readonly name: string;

 @IsDefined()
 @IsString()
 @IsNotEmpty()
 @IsIn(Object.values(UserRole))
 @ApiProperty({ example: "admin", description: 'User role' })
 readonly role: UserRole;

 @IsDefined()
 @IsString()
 @IsNotEmpty()
 @IsEmail()
 @ApiProperty({ example: "john@example.com", description: 'email for login' })
 readonly email: string;
}
