import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marque } from './marque';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  public dataForm: FormGroup;
  private url= 'http://localhost:8080/api/marques';
  private urltest= 'http://localhost:8080/api/marquesTest';
  private url2= 'http://localhost:8080/api';
  public host : string = "http://localhost:8080";
  constructor(private http: HttpClient) { }


  getMarque(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createMarque(marque: Marque): Observable<Object> {
    return this.http.post(`${this.url}`, marque);
  }

  createMarque2(formData: FormData): Observable<Object> {
    return this.http.post(`${this.urltest}`, formData);
  }

  updateMarque(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }
  updateMarque2(id: string,formData: FormData): Observable<Object> {
    return this.http.put(`${this.url}/Update/${id}`, formData);
  }
  deleteMarque(COD_ART: string): Observable<any> {
    return this.http.delete(`${this.url}/${COD_ART}`, { responseType: 'text' });
  }

  getMarquesList(): Observable<Marque[]> {
    return this.http.get<Marque[]>(`${this.url}`);
  }


    /***********upload image */

    
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.url2}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.url2}/files`);
  }
}
