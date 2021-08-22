import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etat_liv } from './etat-liv';

@Injectable({
  providedIn: 'root'
})
export class EtatLivService {

  private url= 'http://localhost:8080/api/etatLivs';

  constructor(private http: HttpClient) { }

  getEtat_liv(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createEtat_liv(etat_liv: Etat_liv): Observable<Object> {
    return this.http.post(`${this.url}`, etat_liv);
  }

  updateEtat_liv(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteEtat_liv(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getEtat_livsList(): Observable<Etat_liv[]> {
    return this.http.get<Etat_liv[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

  /** drop list add prep */
  getAllEtatLivByBL(bon_liv: string): Observable<any> {
    return this.http.get(`${this.url}/etatLiv_BL/${bon_liv}`);
  }










          /**STATISTIQUE Bar Bon prep */

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
        getSumBar8(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar8`);
        }
        getSumBar9(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar9`);
        }
        getSumBar10(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar10`);
        }
        getSumBar11(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar11`);
        }
        getSumBar12(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar12`);
        }






        getSumBar21(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar21`);
        }
        getSumBar22(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar22`);
        }
        getSumBar23(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar23`);
        }
        getSumBar24(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar24`);
        }
        getSumBar25(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar25`);
        }
        getSumBar26(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar26`);
        }
        getSumBar27(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar27`);
        }
        getSumBar28(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar28`);
        }
        getSumBar29(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar29`);
        }
        getSumBar210(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar210`);
        }
        getSumBar211(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar211`);
        }
        getSumBar212(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar212`);
        }




        getSumBar31(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar31`);
        }
        getSumBar32(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar32`);
        }
        getSumBar33(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar33`);
        }
        getSumBar34(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar34`);
        }
        getSumBar35(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar35`);
        }
        getSumBar36(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar36`);
        }
        getSumBar37(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar37`);
        }
        getSumBar38(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar38`);
        }
        getSumBar39(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar39`);
        }
        getSumBar310(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar310`);
        }
        getSumBar311(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar311`);
        }
        getSumBar312(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar312`);
        }






        getSumBar41(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar41`);
        }
        getSumBar42(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar42`);
        }
        getSumBar43(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar43`);
        }
        getSumBar44(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar44`);
        }
        getSumBar45(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar45`);
        }
        getSumBar46(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar46`);
        }
        getSumBar47(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar47`);
        }
        getSumBar48(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar48`);
        }
        getSumBar49(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar49`);
        }
        getSumBar410(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar410`);
        }
        getSumBar411(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar411`);
        }
        getSumBar412(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar412`);
        }
}
