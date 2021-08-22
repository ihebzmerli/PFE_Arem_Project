import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rectif } from './rectif';

@Injectable({
  providedIn: 'root'
})
export class RectifService {

  private url= 'http://localhost:8080/api/rectifs';

  constructor(private http: HttpClient) { }

  getRectif(NUM_BON: bigint): Observable<any> {
    return this.http.get(`${this.url}/${NUM_BON}`);
  }

  createRectif(rectif: Rectif): Observable<Object> {
    return this.http.post(`${this.url}`, rectif);
  }

  updateRectif(id: bigint, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteRectif(id: bigint): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getRectifsList(): Observable<Rectif[]> {
    return this.http.get<Rectif[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }
}
