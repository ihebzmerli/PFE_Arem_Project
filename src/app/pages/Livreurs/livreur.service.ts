import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livreur } from './livreur';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  private url= 'http://localhost:8080/api/livreurs';

  constructor(private http: HttpClient) { }

  getLivreur(id_livreur: string): Observable<any> {
    return this.http.get(`${this.url}/${id_livreur}`);
  }

  createLivreur(livreur: Livreur): Observable<Object> {
    return this.http.post(`${this.url}`, livreur);
  }

  updateLivreur(id_livreur: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id_livreur}`, value);
  }

  deleteLivreur(id_livreur: string): Observable<any> {
    return this.http.delete(`${this.url}/${id_livreur}`, { responseType: 'text' });
  }

  getLivreursList(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }









/**STATISTIQUE Pie Bon liv  */
  getSumL1(): Observable<Object> {
    return this.http.get(`${this.url}/SumL1`);
  }
  getSumL2(): Observable<Object> {
    return this.http.get(`${this.url}/SumL2`);
  }
  getSumL3(): Observable<Object> {
    return this.http.get(`${this.url}/SumL3`);
  }
}
