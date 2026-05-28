import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl: string = "https://localhost:5001/api/admin/";

  constructor(private http: HttpClient) { }
  
  getActiveSliders() {
    return this.http.get(`${this.baseUrl}slider/active-sliders`);
  }

  saveContactUs(contact: any) {
    return this.http.post(`${this.baseUrl}contactus`, contact);
  }

  getProjects() {
    return this.http.get(`${this.baseUrl}sites/get-active-sites`);
  }

}
