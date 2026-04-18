import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SiteComponent } from './sites/site.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sites', component: SiteComponent },
      // { path: 'services', component: AdminServicesComponent }
    ]
  }
];

@NgModule({
  declarations: [    
    AuthComponent,
    DashboardComponent,
    SiteComponent,
    AdminLayoutComponent,
    AdminNavbarComponent
    // AdminServicesComponent,
    // LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
