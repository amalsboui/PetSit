import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/auth';

  login(data: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, data).pipe(
    tap((response: any) => {
      localStorage.setItem('token', response.token);
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      localStorage.setItem('role', payload.role);
      localStorage.setItem('userId', payload.sub.toString());
    })
  );
  }

  register(data: { firstname: string; 
                   lastname: string; 
                   email: string; 
                   password: string; 
                   role:string 
                   description: string
                   availability: string
                  }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(`${this.API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
 
}
