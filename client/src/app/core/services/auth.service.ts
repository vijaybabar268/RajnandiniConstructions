import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:5000/api/admin/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    // Demo credentials for testing
    // if (model.username === 'admin' && model.password === 'password123') {
    //   const user: any = {
    //     id: 1,
    //     username: model.username,
    //     email: 'admin@rajnandini.com',
    //     role: 'admin'
    //   };
    //   localStorage.setItem('user', JSON.stringify(user));
    //   this.currentUserSource.next(user);
    //   return of(user);
    // } else {
    // Try to call backend API for real credentials
    return this.http.post<User>(`${this.baseUrl}auth/login`, model).pipe(
      map((res: User) => {
        const user = res;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return res;
      })
    )
    // }
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
  
}
