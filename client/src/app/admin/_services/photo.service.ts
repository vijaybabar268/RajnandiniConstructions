import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl: string = "https://localhost:5001/api/admin/";

  constructor(private http: HttpClient) { }

  upload(siteId: number, photo: any) {
    var formData = new FormData();
    formData.append('file', photo);

    return this.http.post(`${this.baseUrl}sites/${siteId}/photos`, formData);
  }

  getPhotos(siteId: number) {
    return this.http.get(`${this.baseUrl}sites/${siteId}/photos`);
  }

}
