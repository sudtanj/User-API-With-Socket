import {
 BaseEntity,
 BeforeInsert,
 BeforeUpdate,
 Column,
 CreateDateColumn,
 Entity,
 ObjectID,
 ObjectIdColumn,
 UpdateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt';
import { Type } from "class-transformer";

export enum UserRole {
 ADMIN = "admin",
 USER = "user"
}

@Entity()
export class UsersEntity extends BaseEntity {
 @ObjectIdColumn()
 @ApiProperty({
  description: 'mongo db id',
  enum: () => ObjectID
 })
 id: ObjectID;

 @Column()
 @ApiProperty({ example: "John", description: 'name of the user' })
 name: string
 @Column({
  unique: true
 })
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
function BeforeDelete() {
    throw new Error("Function not implemented.");
}

