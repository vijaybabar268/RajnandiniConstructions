import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string = "https://localhost:5001/api/admin/";
  
  constructor(private http: HttpClient) { }
  
  getContacts() {
    return this.http.get(`${this.baseUrl}ContactUs`);
  }

}
