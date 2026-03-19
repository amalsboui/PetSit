import { WebSocketGateway, WebSocketServer, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:4200' }, 
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
  const { userId } = client.handshake.query;
  
  if (userId) {
    client.join(userId as string);
    console.log(`User ${userId} joined room ${userId}`);
  }
}

handleDisconnect(client: Socket) {
  console.log('Client disconnected:', client.id);
}

sendToUser(userId: string, event: string, payload: any) {
  this.server.to(userId).emit(event, payload);
}
}