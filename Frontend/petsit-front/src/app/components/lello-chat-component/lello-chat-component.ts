import { Component, inject } from '@angular/core';
import { LelloChatService } from '../../services/lello-chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ChatMessage {
  sender: 'You' | 'Lello';
  text: string;
}

@Component({
  selector: 'app-lello-chat-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './lello-chat-component.html',
  styleUrl: './lello-chat-component.css',
})
export class LelloChatComponent {

  chat: ChatMessage[] = [];
  input: string = '';
  loading: boolean = false;
  
  private chatService = inject(LelloChatService);

  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  send() {
    if (!this.input.trim()) return;

    this.chat.push({ sender: 'You', text: this.input });
    this.loading = true;

    this.chatService.sendMessage(this.input).subscribe({
      next: (res) => {
        this.chat.push({ sender: 'Lello', text: res.reply });
        this.loading = false;
      },
      error: () => {
        this.chat.push({ sender: 'Lello', text: 'Oops! Something went wrong.' });
        this.loading = false;
      },
    });

    this.input = '';
  }
}
