import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdminSection: boolean = false;
  private routerSubscription: Subscription | null = null;
  activeSection: string = 'home';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.checkIfAdminSection();
    // Check login status on every route change
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkLoginStatus();
        this.checkIfAdminSection();
      });
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollPos = window.scrollY;

    if (scrollPos < 500) {
      this.activeSection = 'home';
    } else if (scrollPos < 1200) {
      this.activeSection = 'about';
    } else if (scrollPos < 1900) {
      this.activeSection = 'sites';
    } else {
      this.activeSection = 'contact';
    }
  }

  setActive(section: string) {
    this.activeSection = section;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  checkLoginStatus(): void {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
  }

  checkIfAdminSection(): void {
    this.isAdminSection = this.router.url.includes('/admin');
  }

  goToLogin(): void {
    this.router.navigateByUrl('/admin/login');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/admin/login');
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  goHome() {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}
