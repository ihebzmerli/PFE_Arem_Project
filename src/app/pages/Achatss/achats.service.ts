import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Achats } from './Achats';

@Injectable({
  providedIn: 'root'
})
export class AchatsService {

  private url= 'http://localhost:8080/api/achatss';

  constructor(private http: HttpClient) { }


  getAchatss(numDocAchat: string): Observable<any> {
    return this.http.get(`${this.url}/${numDocAchat}`);
  }

  getAchatssList(): Observable<Achats[]> {
    return this.http.get<Achats[]>(`${this.url}`);
  }

  /** drop list add prep */

  getArtAchaForAchats(num_doc: string): Observable<any> {
    return this.http.get(`${this.url}/DetailsArtAchaByAchats/${num_doc}`);
  }

  ChangeAchatToValidate(numDocAchat): Observable<Object> {
    return this.http.get(`${this.url}/Valider/${numDocAchat}`);
  }
  ChangeAchatToNotValidate(numDocAchat): Observable<Object> {
    return this.http.get(`${this.url}/NotValider/${numDocAchat}`);
  }

  getAllAchatBydateBetween(startDate: string,endDate: string): Observable<Achats[]> {
    return this.http.get<Achats[]>(`${this.url}/dateBetween/${startDate}to${endDate}`);
  }








      /**STATISTIQUE pie Validation Achats */
  
      getSumV1(): Observable<Object> {
        return this.http.get(`${this.url}/SumV1`);
      }
      getSumV2(): Observable<Object> {
        return this.http.get(`${this.url}/SumV2`);
      }

      /**STATISTIQUE pie Pret Achats */


      getSumP1(): Observable<Object> {
        return this.http.get(`${this.url}/SumP1`);
      }
      getSumP2(): Observable<Object> {
        return this.http.get(`${this.url}/SumP2`);
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
