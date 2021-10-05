import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Art_acha } from './art-acha';

@Injectable({
  providedIn: 'root'
})
export class ArtAchaService {

  private url= 'http://localhost:8080/api/artachas';

  constructor(private http: HttpClient) { }


  getArt_acha(id: bigint): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createArt_acha(artacha: Art_acha): Observable<Object> {
    return this.http.post(`${this.url}`, artacha);
  }

  updateArt_acha(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/QutNonTrouver/${id}`, value);
  }

  deleteArt_acha(id: bigint): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getArt_achasList(): Observable<Art_acha[]> {
    return this.http.get<Art_acha[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

}
