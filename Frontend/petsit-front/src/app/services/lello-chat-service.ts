import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

interface LelloResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root',
})

export class LelloChatService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/lello-chat';

  sendMessage(message: string): Observable<LelloResponse> {
    return this.http.post<LelloResponse>(this.API_URL, { message });
  }
}
