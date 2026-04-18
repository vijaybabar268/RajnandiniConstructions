import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  model: any = { username: '', password: '' };
  loading = false;
  submitted = false;
  error = '';
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {    
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (!this.model.username || !this.model.password) {
      this.error = 'Please enter username and password';
      this.loading = false;
      return;
    }

    this.authService.login(this.model).subscribe({
      next: (res) => {
        debugger
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(res));
        this.loading = false;
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        console.log("Error: ", err);
        this.error = 'Invalid username or password';
        this.model.password = '';
        this.loading = false;
      }
    })
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  
}
