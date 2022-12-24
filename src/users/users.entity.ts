import {
 BeforeInsert,
 BeforeUpdate,
 Column,
 CreateDateColumn,
 Entity,
 ObjectIdColumn,
 UpdateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';

export enum UserRole {
 ADMIN = "admin",
 USER = "user"
}

@Entity()
export class UsersEntity {
 @ObjectIdColumn()
 @ApiProperty({ description: 'mongo db id' })
 id: string;
 @Column()
 @ApiProperty({ example: "John", description: 'name of the user' })
 name: string
 @Column()
 @ApiProperty({ example: "John@example.com", description: 'email of the user' })
 email: string
 @Column()
 password: string
 @Column()
 @ApiProperty({ example: "admin", description: 'User role' })
 role: UserRole

 @CreateDateColumn()
 createdAt: Date;

 @UpdateDateColumn()
 updatedAt: Date;

 constructor(data: Partial<UsersEntity> = {}) {
  Object.assign(this, data);
 }

 @BeforeInsert()
 @BeforeUpdate()
 async hashPassword(): Promise<void> {
  const salt = await bcrypt.genSalt();
  if (!/^\$2[abxy]?\$\d+\$/.test(this.password)) {
   this.password = await bcrypt.hash(this.password, salt);
  }
 }

 async checkPassword(plainPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, this.password);
 }
}
