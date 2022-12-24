import {
 OnGatewayConnection,
 OnGatewayDisconnect,
 OnGatewayInit,
 WebSocketGateway,
 WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { Repository } from "typeorm";

@WebSocketGateway({ cors: { origin: "*" } })
export class UsersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 @WebSocketServer()
 server: Server;
 private logger: Logger = new Logger('AppGateway');
 @InjectRepository(UsersEntity)
 private readonly userRepository: Repository<UsersEntity>

 afterInit(server: Server) {
  this.logger.log('Init');
 }

 handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
 }

 async handleConnection(client: Socket, ...args: any[]) {
  client.emit("eventMemberUsers", await this.getUsersList())
  this.logger.log(`Client connected: ${client.id}`);
 }

 async emitUsersList() {
  this.server.sockets.emit('eventMemberUsers', await this.getUsersList())
 }

 async getUsersList() {
  const [users, count] = await Promise.all([this.userRepository.find(), this.userRepository.count()])

  return {
   users, count
  }
 }
}

