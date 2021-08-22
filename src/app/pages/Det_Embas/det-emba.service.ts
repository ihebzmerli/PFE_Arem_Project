import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Det_emba } from './det-emba';

@Injectable({
  providedIn: 'root'
})
export class DetEmbaService {

  private url= 'http://localhost:8080/api/detEmbas';

  constructor(private http: HttpClient) { }

  getDet_emba(id: bigint): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createDet_emba(det_emba: Det_emba): Observable<Object> {
    return this.http.post(`${this.url}`, det_emba);
  }

  updateDet_emba(id: bigint, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteDet_emba(id: bigint): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getDet_embasList(): Observable<Det_emba[]> {
    return this.http.get<Det_emba[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }
}
