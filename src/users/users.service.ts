import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersEntity } from './users.entity';
import { UserUpdate } from './dto/user-update.dto';
import { JwtPayload } from "./intefaces/jwt-payload.interface";

import { ObjectID } from 'mongodb';

@Injectable()
export class UsersService {
 constructor(
  @InjectRepository(UsersEntity)
  private readonly userRepository: Repository<UsersEntity>,
  private readonly jwtService: JwtService,
 ) {}

 async create(data: Partial<UsersEntity>): Promise<UsersEntity> {
  const user = this.userRepository.create(data);

  return this.userRepository.save(user);
 }

 async findAll(where: FindOneOptions<UsersEntity>) {
  const user = await this.userRepository.find(where);

  if (!user) {
   throw new NotFoundException(
    `There isn't any user with identifier: ${where}`,
   );
  }

  return user;
 }

 async findOne(where: FindOneOptions<UsersEntity>): Promise<UsersEntity> {
  const user = await this.userRepository.findOne(where);

  if (!user) {
   throw new NotFoundException({
    message: `There isn't any user with identifier`,
    whereCondition: where
   });
  }

  return user;
 }

 async update(id: string, updates: UserUpdate): Promise<UsersEntity> {
  const user = await this.userRepository.findOneBy({
   // @ts-ignore
   _id: new ObjectID(id)
  });

  if (!user) {
   throw new NotFoundException(`There isn't any user with id: ${id}`);
  }

  this.userRepository.merge(user, updates);

  return this.userRepository.save(user);
 }

 async delete(id: string) {
  const user = await this.userRepository.findOneBy({
   // @ts-ignore
   _id: new ObjectID(id)
  });

  if (!user) {
   throw new NotFoundException(`There isn't any user with id: ${id}`);
  }

  await this.userRepository.remove(user);

  return user;
 }

 // login jwt
 async login(email: string, password: string): Promise<UsersEntity> {
  let user: UsersEntity;

  try {
   user = await this.findOne({ where: { email } });
  } catch (err) {
   throw new UnauthorizedException(
    `There isn't any user with email: ${email}`,
   );
  }

  if (!(await user.checkPassword(password))) {
   throw new UnauthorizedException(
    `Wrong password for user with email: ${email}`,
   );
  }
  delete user.password;

  return user
 }

 signToken(user: UsersEntity): string {
  const payload = {
   sub: user.email,
   role: user.role,
  }

  return this.jwtService.sign(payload);
 }

 async verifyPayload(payload: JwtPayload): Promise<UsersEntity> {
  let user: UsersEntity

  try {
   user = await this.findOne({ where: { email: payload.sub } });
  } catch (error) {
   throw new UnauthorizedException(
    `There isn't any user with email: ${payload.sub}`,
   );
  }
  delete user.password;

  return user;
 }
}
