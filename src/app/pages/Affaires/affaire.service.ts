import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Affaire } from './affaire';

@Injectable({
  providedIn: 'root'
})
export class AffaireService {

  private url= 'http://localhost:8080/api/affaires';

  constructor(private http: HttpClient) { }


  getAffaires(numDoc: string): Observable<any> {
    return this.http.get(`${this.url}/${numDoc}`);
  }

  getAffaireList(): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}`);
  }
  getAllAffaireBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/dateBetween/${startDate}to${endDate}`);
  }

    /**STATISTIQUE Article */

    getSumAvg1(): Observable<Object> {
      return this.http.get(`${this.url}/SumAvg1`);
    }
    getSumAvg2(): Observable<Object> {
      return this.http.get(`${this.url}/SumAvg2`);
    }
      /**STATISTIQUE Bar Article */
  
      getSumBar1(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar1`);
      }
      getSumBar2(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar2`);
      }
      getSumBar3(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar3`);
      }
      getSumBar4(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar4`);
      }
      getSumBar5(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar5`);
      }
      getSumBar6(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar6`);
      }
      getSumBar7(): Observable<Object> {
        return this.http.get(`${this.url}/SumBar7`);
      }
}
