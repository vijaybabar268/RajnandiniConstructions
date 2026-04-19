import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  baseUrl: string = "https://localhost:5001/api/admin/";

  constructor(private http: HttpClient) { }
  
  getSites() {
    return this.http.get(`${this.baseUrl}sites`);
  }

  getSite(id: number) {
    return this.http.get(`${this.baseUrl}sites/` +  id);
  }

  create(site: any) {
    return this.http.post(`${this.baseUrl}sites`, site);
  }

  update(site: any) {
    return this.http.put(this.baseUrl + 'sites/' + site.id, site);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'sites/' + id);
  }
}
