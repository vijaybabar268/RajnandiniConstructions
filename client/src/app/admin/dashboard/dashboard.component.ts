import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
  bgClass: string;
}

interface RecentSite {
  id: number;
  name: string;
  location: string;
  status: string;
  progress: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null> = of(null);

  statCards: StatCard[] = [
    { title: 'Total Sites', value: 15, icon: 'dashboard', color: 'primary', bgClass: 'stat-primary' },
    { title: 'Active Sites', value: 8, icon: 'construction', color: 'accent', bgClass: 'stat-accent' },
    { title: 'Completed', value: 5, icon: 'check_circle', color: 'warn', bgClass: 'stat-warn' },
    { title: 'Total Revenue', value: '₹2.5Cr', icon: 'trending_up', color: 'primary', bgClass: 'stat-primary' }
  ];

  recentSites: RecentSite[] = [
    { id: 1, name: 'Residential Complex - Phase 1', location: 'Downtown Area', status: 'Active', progress: 75 },
    { id: 2, name: 'Commercial Plaza', location: 'Business District', status: 'In Progress', progress: 50 },
    { id: 3, name: 'School Building', location: 'Suburb', status: 'Planned', progress: 20 }
  ];

  displayedColumns: string[] = ['name', 'location', 'status', 'progress'];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.SetCurrentUser();
  }

  SetCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user: User = JSON.parse(userString);
    this.authService.setCurrentUser(user);
  }

  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'Active':
        return 'accent';
      case 'In Progress':
        return 'warn';
      case 'Planned':
        return 'primary';
      default:
        return 'primary';
    }
  }

  getProgressColor(progress: number): 'accent' | 'primary' | 'warn' {
    if (progress >= 75) return 'accent';
    if (progress >= 50) return 'warn';
    return 'primary';
  }

  quickAction(action: string): void {
    console.log('Quick action:', action);
  }
}
