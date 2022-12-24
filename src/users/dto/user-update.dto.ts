import { IsDefined, IsString, IsNotEmpty, IsEmail, IsIn } from 'class-validator';
import { UserRole } from "../users.entity";

export class UserUpdate {
 @IsDefined()
 @IsString()
 @IsNotEmpty()
 readonly name: string;

 @IsDefined()
 @IsString()
 @IsNotEmpty()
 @IsIn(Object.values(UserRole))
 readonly role: UserRole;

 @IsDefined()
 @IsString()
 @IsNotEmpty()
 @IsEmail()
 readonly email: string;
}
