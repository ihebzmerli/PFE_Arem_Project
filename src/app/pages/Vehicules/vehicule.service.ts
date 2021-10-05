import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from './vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private url= 'http://localhost:8080/api/vehicules';

  constructor(private http: HttpClient) { }

  getVehicule(matricule: string): Observable<any> {
    return this.http.get(`${this.url}/${matricule}`);
  }

  createVehicule(vehicule: Vehicule): Observable<Object> {
    return this.http.post(`${this.url}`, vehicule);
  }

  updateVehicule(matricule: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${matricule}`, value);
  }

  deleteVehicule(matricule: string): Observable<any> {
    return this.http.delete(`${this.url}/${matricule}`, { responseType: 'text' });
  }

  getVehiculesList(): Observable<Vehicule[]> {
    return this.http.get<Vehicule[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }


    /**drop down list add for bon sort */

    getVehiculeOfAdd(): Observable<any> {
      return this.http.get(`${this.url}/AllListVehicule`);
    }
  
    getCouleurVehicule(): Observable<any> {
      return this.http.get(`${this.url}/couleursV`);
    }
  
    /**drop down list add for bon sort */


    getAllVehiculeDT_ACQBydateBetween(startDate: string,endDate: string): Observable<Vehicule[]> {
      return this.http.get<Vehicule[]>(`${this.url}/DT_ACQBetween/${startDate}to${endDate}`);
    }

    getAllVehiculedt1mc2BydateBetween(startDate: string,endDate: string): Observable<Vehicule[]> {
      return this.http.get<Vehicule[]>(`${this.url}/t1mc2Between/${startDate}to${endDate}`);
    }

    getAllVehiculedt1mcBydateBetween(startDate: string,endDate: string): Observable<Vehicule[]> {
      return this.http.get<Vehicule[]>(`${this.url}/dt1mcBetween/${startDate}to${endDate}`);
    }

    getAllVehiculedtfassBydateBetween(startDate: string,endDate: string): Observable<Vehicule[]> {
      return this.http.get<Vehicule[]>(`${this.url}/dtfassBetween/${startDate}to${endDate}`);
    }

    getAllVehiculedtfvisitBydateBetween(startDate: string,endDate: string): Observable<Vehicule[]> {
      return this.http.get<Vehicule[]>(`${this.url}/dtfvisitBetween/${startDate}to${endDate}`);
    }

}
