import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from './gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url= 'http://localhost:8080/api/gallerys';

  constructor(private http: HttpClient) { }

  getGallery(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createGallery(gallery: Gallery): Observable<Object> {
    return this.http.post(`${this.url}`, gallery);
  }

  updateGallery(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteGallery(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getGallerysList(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.url}`);
  }

}
