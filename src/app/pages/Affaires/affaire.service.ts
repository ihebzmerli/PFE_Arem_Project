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
  getAllAffaireDAT_AFFBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/DAT_AFFdateBetween/${startDate}to${endDate}`);
  }
  getAllAffaireDAT_PROFBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/DAT_PROFdateBetween/${startDate}to${endDate}`);
  }
  getAllAffaireDAT_CONFBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/DAT_CONFdateBetween/${startDate}to${endDate}`);
  }
  getAllAffaireDAT_TRANSFBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/DAT_TRANSFdateBetween/${startDate}to${endDate}`);
  }
  getAllAffaireDAT_ANALBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/DAT_ANALdateBetween/${startDate}to${endDate}`);
  }
  getAllAffaireDAT_FACBydateBetween(startDate: string,endDate: string): Observable<Affaire[]> {
    return this.http.get<Affaire[]>(`${this.url}/DAT_FACdateBetween/${startDate}to${endDate}`);
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
