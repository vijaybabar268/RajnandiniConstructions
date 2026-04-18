import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigateByUrl('/admin/login');
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/admin/login');
  }
}
