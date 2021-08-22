import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chariot } from './chariot';

@Injectable({
  providedIn: 'root'
})
export class ChariotService {

  private url= 'http://localhost:8080/api/chariots';
  private url2= 'http://localhost:8080/api/artPreps';
  constructor(private http: HttpClient) { }

  getChariot(num_char: string): Observable<any> {
    return this.http.get(`${this.url}/${num_char}`);
  }

  createChariot(chariot: Chariot): Observable<Object> {
    return this.http.post(`${this.url}`, chariot);
  }

  updateChariot(num_char: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${num_char}`, value);
  }

  deleteChariot(num_char: string): Observable<any> {
    return this.http.delete(`${this.url}/${num_char}`, { responseType: 'text' });
  }

  getChariotsList(): Observable<Chariot[]> {
    return this.http.get<Chariot[]>(`${this.url}`);
  }

  getArtPrepByChariot(num_char: string): Observable<any> {
    return this.http.get(`${this.url}/DetailsChariot/${num_char}`);
  }
  getLastIdChariot(): Observable<Object>{
    return this.http.get(`${this.url}/LastChariot`);
  }

  getChariotExisteOrNot(num_char: string): Observable<Object>{
    return this.http.get(`${this.url}/ChariotExisteOrNot/${num_char}`);
  }

  ChangeChariotEtatEnAttent(numChar: string): Observable<any> {
    return this.http.get(`${this.url}/chariotChangeEtatEnAttent/${numChar}`);
  }
  ChronoChariotPointage(numChar: string): Observable<Object> {
    return this.http.get(`${this.url2}/ChronoChariotPointage/${numChar}`);
  }
  ChangeChrono(numChar: string): Observable<any> {
    return this.http.get(`${this.url2}/ChangeChrono/${numChar}`);
  }






  /**STATISTIQUE Pie Bon liv  */
  getSumCha1(): Observable<Object> {
    return this.http.get(`${this.url}/SumCha1`);
  }
  getSumCha2(): Observable<Object> {
    return this.http.get(`${this.url}/SumCha2`);
  }
  getSumCha3(): Observable<Object> {
    return this.http.get(`${this.url}/SumCha3`);
  }
}
