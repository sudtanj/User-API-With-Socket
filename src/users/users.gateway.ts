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
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({ cors: { origin: "*" } })
export class UsersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 @WebSocketServer()
 server: Server;
 private logger: Logger = new Logger('AppGateway');
 @InjectRepository(UsersEntity)
 private readonly userRepository: Repository<UsersEntity>

 constructor(
  private readonly jwtService: JwtService,
 ) {
 }

 afterInit(server: Server) {
  this.logger.log('Init');
 }

 handleDisconnect(client: Socket) {
  this.logger.log(`Client disconnected: ${client.id}`);
 }

 async handleConnection(client: Socket, ...args: any[]) {
  const userToken: string | undefined = client.handshake.headers.authorization
  if  (typeof userToken !== 'string' || userToken.length === 0) {
   client.emit('error', 'authentication error');
   client.disconnect(true)
   return;
  }
  try {
   this.jwtService.verify(userToken.split(" ")[1])
  } catch (e) {
   client.emit('error', 'authentication error! invalid token');
   client.disconnect(true)
   this.logger.log(e)
   return;
  }
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

