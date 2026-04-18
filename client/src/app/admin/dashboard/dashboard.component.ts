import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser$: Observable<User | null> = of(null);

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
}
