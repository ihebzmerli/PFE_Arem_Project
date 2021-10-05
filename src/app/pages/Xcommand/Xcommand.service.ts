import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Xcommand } from './Xcommand';

@Injectable({
  providedIn: 'root'
})
export class XcommandService {

  private url= 'http://localhost:8080/api/Xcommands';

  constructor(private http: HttpClient) { }

  getXcommand(numCom: string): Observable<any> {
    return this.http.get(`${this.url}/${numCom}`);
  }

  getXcommandsList(): Observable<Xcommand[]> {
    return this.http.get<Xcommand[]>(`${this.url}`);
  }

  getXcommandBlNull(): Observable<Xcommand[]> {
    return this.http.get<Xcommand[]>(`${this.url}/BlNull`);
  }

}
