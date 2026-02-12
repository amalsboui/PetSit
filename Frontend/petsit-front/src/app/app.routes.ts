import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { MainLayout } from './components/layouts/main-layout/main-layout';
import { AuthLayout } from './components/layouts/auth-layout/auth-layout';
import { SittersComponent } from './components/sitters-component/sitters-component';
import { NewBookingComponent } from './components/bookings/new-booking-component/new-booking-component';
import { SitterDashboardComponent } from './components/sitter-dashboard-component/sitter-dashboard-component';
import { OwnerDashboardComponent } from './components/owner-dashboard-component/owner-dashboard-component';
import { AdminDashboardComponent } from './components/admin-dashboard-component/admin-dashboard-component';
import { LelloChatComponent } from './components/lello-chat-component/lello-chat-component';
import { roleGuard } from './role-guard';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    {   
        path: '', 
        component: MainLayout,
        children: [
        {path:'', component: HomeComponent},
        {path:'sitters', component: SittersComponent},
        {path: 'bookings/new', canActivate:[authGuard, roleGuard(['owner'])],component: NewBookingComponent },
        {path: 'sitter', canActivate: [authGuard, roleGuard(['sitter'])], component: SitterDashboardComponent},
        {path: 'owner', canActivate: [authGuard, roleGuard(['owner'])], component:OwnerDashboardComponent},
        {path: 'admin', canActivate: [authGuard, roleGuard(['admin'])], component: AdminDashboardComponent },
        {path: 'lellochat',canActivate: [authGuard], component: LelloChatComponent },

        ]
    },
    {
        path: '',
        component: AuthLayout,
        children: [
        { path: 'login', component: Login },
        { path: 'register', component: Register }
    ]
  }
];
