import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }, // allow frontend connection; tighten in prod
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const { userId } = client.handshake.query;
    if (userId) {
      client.join(userId as string); // Each user has a private room
      console.log(`User ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // Send notif to a specific user
  sendToUser(userId: string, event: string, payload: any) {
    this.server.to(userId).emit(event, payload);
  }
}