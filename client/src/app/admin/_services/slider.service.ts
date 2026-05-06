import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  baseUrl: string = "https://localhost:5001/api/admin/";

  constructor(private http: HttpClient) { }
  
  getSliders() {
    return this.http.get(`${this.baseUrl}slider`);
  }

  getSlide(id: number) {
    return this.http.get(`${this.baseUrl}slider/` +  id);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'slider/' + id);
  }

  toggleStatus(id: number) {
    return this.http.put(this.baseUrl + 'slider/toggle-slider?id=' + id, {})
  }


  createSlider(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}slider`, data);
  }

  updateSlider(id: number, data: FormData): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}slider/${id}`, data);
  }

}
