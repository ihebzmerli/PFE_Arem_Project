import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expide } from './expide';
import { Livreur_Expide } from './LivreurBonliv/Livreur_Expide';

@Injectable({
  providedIn: 'root'
})
export class ExpideService {

  private url= 'http://localhost:8080/api/expides';
  private url2= 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getExpide(id_expide: string): Observable<any> {
    return this.http.get(`${this.url}/${id_expide}`);
  }

  createExpide(expide: Expide): Observable<Object> {
    return this.http.post(`${this.url}`, expide);
  }

  createLivreurs_Expides(livreur_expide: Livreur_Expide): Observable<Object> {
    return this.http.post(`${this.url2}/Livreur_Expides`, livreur_expide);
  }

  getAllLivreurs_ExpidesById(id_expide: string): Observable<Livreur_Expide[]> {
    return this.http.get<Livreur_Expide[]>(`${this.url2}/Livreur_ExpidesById/${id_expide}`);
  }

  updateLivreurs_Expides(id_expide: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/Livreur_ExpidesById/${id_expide}`, value);
  }

  deleteAllByExpidition(id_expide: string): Observable<Object> {
    return this.http.get(`${this.url2}/Livreur_Expides/DeleteAllExpideID/${id_expide}`);
  }

  updateExpide(id_expide: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id_expide}`, value);
  }

  deleteExpide(id_expide: string): Observable<any> {
    return this.http.delete(`${this.url}/${id_expide}`, { responseType: 'text' });
  }

  getExpidesList(): Observable<Expide[]> {
    return this.http.get<Expide[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }
  getAllExpideBydateEXBetween(startDate: string,endDate: string): Observable<Expide[]> {
    return this.http.get<Expide[]>(`${this.url}/expide_Date/${startDate}to${endDate}`);
  }

  getAllLivreursAndBonliv(id_expide: string): Observable<any> {
    return this.http.get(`${this.url}/LivreurBonliv/${id_expide}`);
  }
    /**drop down list add for bon sort */

    getBonLivOfAdd(): Observable<any> {
      return this.http.get(`${this.url}/AllListBonliv`);
    }

    getLivreurOfAdd(): Observable<any> {
      return this.http.get(`${this.url}/AllListLivreur`);
    } 

    getVehiculeOfAdd(): Observable<any> {
      return this.http.get(`${this.url}/AllListVehicule`);
    } 

    /**drop down list add for bon sort */



    getLastId(): Observable<Object> {
      return this.http.get(`${this.url}/LastId`);
    }


    /**STATISTIQUE Pie Bon liv  */
  getSumT1(): Observable<Object> {
    return this.http.get(`${this.url}/SumT1`);
  }
  getSumT2(): Observable<Object> {
    return this.http.get(`${this.url}/SumT2`);
  }




      /**STATISTIQUE bAR Bon liv  */
  getSumM11(): Observable<Object> {
    return this.http.get(`${this.url}/SumM11`);
  }
  getSumM12(): Observable<Object> {
    return this.http.get(`${this.url}/SumM12`);
  }
  getSumM13(): Observable<Object> {
    return this.http.get(`${this.url}/SumM13`);
  }
  getSumM14(): Observable<Object> {
    return this.http.get(`${this.url}/SumM14`);
  }
  getSumM15(): Observable<Object> {
    return this.http.get(`${this.url}/SumM15`);
  }
  getSumM16(): Observable<Object> {
    return this.http.get(`${this.url}/SumM16`);
  }
  getSumM17(): Observable<Object> {
    return this.http.get(`${this.url}/SumM17`);
  }
  getSumM18(): Observable<Object> {
    return this.http.get(`${this.url}/SumM18`);
  }
  getSumM19(): Observable<Object> {
    return this.http.get(`${this.url}/SumM19`);
  }
  getSumM110(): Observable<Object> {
    return this.http.get(`${this.url}/SumM110`);
  }
  getSumM111(): Observable<Object> {
    return this.http.get(`${this.url}/SumM111`);
  }
  getSumM112(): Observable<Object> {
    return this.http.get(`${this.url}/SumM112`);
  }


  getSumM21(): Observable<Object> {
    return this.http.get(`${this.url}/SumM21`);
  }
  getSumM22(): Observable<Object> {
    return this.http.get(`${this.url}/SumM22`);
  }
  getSumM23(): Observable<Object> {
    return this.http.get(`${this.url}/SumM23`);
  }
  getSumM24(): Observable<Object> {
    return this.http.get(`${this.url}/SumM24`);
  }
  getSumM25(): Observable<Object> {
    return this.http.get(`${this.url}/SumM25`);
  }
  getSumM26(): Observable<Object> {
    return this.http.get(`${this.url}/SumM26`);
  }
  getSumM27(): Observable<Object> {
    return this.http.get(`${this.url}/SumM27`);
  }
  getSumM28(): Observable<Object> {
    return this.http.get(`${this.url}/SumM28`);
  }
  getSumM29(): Observable<Object> {
    return this.http.get(`${this.url}/SumM29`);
  }
  getSumM210(): Observable<Object> {
    return this.http.get(`${this.url}/SumM210`);
  }
  getSumM211(): Observable<Object> {
    return this.http.get(`${this.url}/SumM211`);
  }
  getSumM212(): Observable<Object> {
    return this.http.get(`${this.url}/SumM212`);
  }



  //** statistique expide bar annnées */
  getSumA11(): Observable<Object> {
    return this.http.get(`${this.url}/SumA11`);
  }
  getSumA12(): Observable<Object> {
    return this.http.get(`${this.url}/SumA12`);
  }
  getSumA13(): Observable<Object> {
    return this.http.get(`${this.url}/SumA13`);
  }
  getSumA14(): Observable<Object> {
    return this.http.get(`${this.url}/SumA14`);
  }
  getSumA15(): Observable<Object> {
    return this.http.get(`${this.url}/SumA15`);
  }
  getSumA16(): Observable<Object> {
    return this.http.get(`${this.url}/SumA16`);
  }
  getSumA17(): Observable<Object> {
    return this.http.get(`${this.url}/SumA17`);
  }


  getSumA21(): Observable<Object> {
    return this.http.get(`${this.url}/SumA21`);
  }
  getSumA22(): Observable<Object> {
    return this.http.get(`${this.url}/SumA22`);
  }
  getSumA23(): Observable<Object> {
    return this.http.get(`${this.url}/SumA23`);
  }
  getSumA24(): Observable<Object> {
    return this.http.get(`${this.url}/SumA24`);
  }
  getSumA25(): Observable<Object> {
    return this.http.get(`${this.url}/SumA25`);
  }
  getSumA26(): Observable<Object> {
    return this.http.get(`${this.url}/SumA26`);
  }
  getSumA27(): Observable<Object> {
    return this.http.get(`${this.url}/SumA27`);
  }
}
