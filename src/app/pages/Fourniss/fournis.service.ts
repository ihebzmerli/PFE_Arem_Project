import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournis } from './fournis';

@Injectable({
  providedIn: 'root'
})
export class FournisService {

  private url= 'http://localhost:8080/api/fournis';

  constructor(private http: HttpClient) { }

  getFournis(codFrs: string): Observable<any> {
    return this.http.get(`${this.url}/${codFrs}`);
  }

  getFournissList(): Observable<Fournis[]> {
    return this.http.get<Fournis[]>(`${this.url}`);
  }

  updateFournis(codFrs: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${codFrs}`, value);
  }
}
