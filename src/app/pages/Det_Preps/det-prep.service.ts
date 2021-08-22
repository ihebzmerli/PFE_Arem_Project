import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Det_prep } from './det-prep';

@Injectable({
  providedIn: 'root'
})
export class DetPrepService {

  private url= 'http://localhost:8080/api/detPreps';

  constructor(private http: HttpClient) { }

  getDet_prep(id: bigint): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createDet_prep(det_prep: Det_prep): Observable<Object> {
    return this.http.post(`${this.url}`, det_prep);
  }

  updateDet_prep(id: bigint, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteDet_prep(id: bigint): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getDet_prepsList(): Observable<Det_prep[]> {
    return this.http.get<Det_prep[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }
}
