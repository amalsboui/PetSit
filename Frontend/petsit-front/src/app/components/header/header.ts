import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  role: string | null = null;

  constructor() {
    this.role = localStorage.getItem('role');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  private authService = inject(Auth);
  private router = inject(Router);
  logout() {
    this.authService.logout().subscribe({
      next: () => {
      // API call succeeded
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['/']);
    },
    error: (error) => {
      // API call failed (expired token, network error, etc.)
      console.error('Logout API failed, performing local logout anyway:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['/']);
    }
    });
  }

}