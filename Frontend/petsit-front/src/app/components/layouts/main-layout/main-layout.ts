import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from '../../header/header';
import { Footer } from '../../footer/footer';
import { Notification } from '../../../models/notification.model';
import { SocketService } from '../../../services/socket-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private notificationTimeouts: Map<string, any> = new Map();

  constructor(
    private socketService: SocketService,
    private router: Router
  ) {
  }

  ngOnInit() {    
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      this.socketService.connect(userId);
      
      // Écouter les nouvelles demandes (pour les sitters)
      this.socketService.on('newRequest').subscribe((data) => {
        this.addNotification({
          type: 'newRequest',
          title: '🐾 Nouvelle demande de garde',
          message: `${data.petName} a besoin de toi !`,
          data: data
        });
      });
      
      // Écouter les acceptations (pour les owners)
      this.socketService.on('requestAccepted').subscribe((data) => {
        this.addNotification({
          type: 'requestAccepted',
          title: 'Demande acceptée',
          message: 'Ta demande de garde a été acceptée !',
          data: data
        });
      });
      
      // Écouter les refus (pour les owners)
      this.socketService.on('requestRefused').subscribe((data) => {
        this.addNotification({
          type: 'requestRefused',
          title: 'Demande refusée',
          message: 'Ta demande de garde a été refusée',
          data: data
        });
      });

    } else {
      console.log('❌ User not logged in, skipping WebSocket connection');
    }
    
    console.log('🏁 MainLayout ngOnInit finished');
  }

  addNotification(notif: Omit<Notification, 'id' | 'time' | 'removing'>) {
    const id = Date.now().toString();
    const newNotif: Notification = {
      ...notif,
      id: id,
      time: new Date(),
      removing: false
    };
    
    this.notifications.unshift(newNotif);
    
    console.log('📋 Updated notifications count:', this.notifications.length);
    
    // Auto-supprimer après 5 secondes
    const timeout = setTimeout(() => {
      this.removeNotification(id);
    }, 5000);
    
    this.notificationTimeouts.set(id, timeout);
  }

  markAsRead(notification: Notification) {    
  if (notification.data?.requestId) {
    const role = localStorage.getItem('role');
    
    if (role === 'sitter') {
      this.router.navigate(['/sitter', notification.data.requestId]);
    } else if (role === 'owner') {
      this.router.navigate(['/owner', notification.data.requestId]);
    } else {
      // Fallback
      this.router.navigate(['/', notification.data.requestId]);
    }
  }
  this.removeNotification(notification.id);
}

  closeNotification(event: Event, notification: Notification) {
    event.stopPropagation();
    this.removeNotification(notification.id);
  }

  removeNotification(id: string) {
    // Clear timeout si existe
    if (this.notificationTimeouts.has(id)) {
      clearTimeout(this.notificationTimeouts.get(id));
      this.notificationTimeouts.delete(id);
    }
    
    // Animation de disparition
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.removing = true;
      
      // Retirer après l'animation
      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n.id !== id);
      }, 300);
    } else {
      console.log('⚠️ Notification not found for removal:', id);
    }
  }

  ngOnDestroy() {
    // Cleanup des timeouts
    this.notificationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.notificationTimeouts.clear();
    this.socketService.disconnect();
  }
}