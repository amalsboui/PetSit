import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private socket!: Socket;

  // Connect to the backend with the current user's ID 
  connect(userId: string) {
    this.socket = io('http://localhost:3000', {
      query: { userId }, // backend uses this to assign private room
    });
    console.log('Connected to WebSocket as user', userId);
  }

  // Listen for a specific event from the server 
  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  // Disconnect from webSocket when leaving 
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket');
    }
  }
}
  
