import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prime } from './prime';

@Injectable({
  providedIn: 'root'
})
export class PrimeService {

  private url= 'http://localhost:8080/api/primes';

  constructor(private http: HttpClient) { }

  getPrime(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createPrime(prime: Prime): Observable<Object> {
    return this.http.post(`${this.url}`, prime);
  }

  updatePrime(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deletePrime(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getPrimesList(): Observable<Prime[]> {
    return this.http.get<Prime[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }


  getAllPrimeDER_MVTBydateBetween(startDate: string,endDate: string): Observable<Prime[]> {
    return this.http.get<Prime[]>(`${this.url}/dat_reclamDER_MVTBetween/${startDate}to${endDate}`);
  }
  
}
