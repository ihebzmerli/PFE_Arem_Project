import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private url= 'http://localhost:8080/api/models';
  private urlTest= 'http://localhost:8080/api/models';
  constructor(private http: HttpClient) { }

  getModel(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createModel(model: Model): Observable<Object> {
    return this.http.post(`${this.url}`, model);
  }

  updateModel(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteModel(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getModelsList(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

  getAllModelByMarque(marque_id: string): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.url}/getByMarque/${marque_id}`);
  }
}
