import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  create(slide: any) {
    return this.http.post(`${this.baseUrl}slider`, slide);
  }

  upload(slide: any, photo: any) {
    var formData = new FormData();
    // Use PascalCase keys to match SlideRequestDto (Id, Title, Description, File, IsActive)
    formData.append('File', photo);
    if (slide) {
      if (slide.title !== undefined) formData.append('Title', slide.title);
      if (slide.description !== undefined) formData.append('Description', slide.description);
      if (slide.id !== undefined && slide.id !== null) formData.append('Id', String(slide.id));
      if (slide.isActive !== undefined) formData.append('IsActive', String(slide.isActive));
    }

    return this.http.post(`${this.baseUrl}slider`, formData);
  }

  update(slide: any) {
    return this.http.put(this.baseUrl + 'slider/' + slide.id, slide);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'slider/' + id);
  }

  toggleStatus(id: number) {
    return this.http.put(this.baseUrl + 'slider/toggle-slider?id=' + id, {})
  }

}
