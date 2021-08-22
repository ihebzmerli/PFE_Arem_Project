import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bon_sort } from './bon-sort';

import { FormGroup } from '@angular/forms';
import { Art_Sort } from './Art_Sorts/art-sort';

@Injectable({
  providedIn: 'root'
})
export class BonSortService {

  public dataForm: FormGroup;
  private url= 'http://localhost:8080/api/bonSorts';
  private urlUser= 'http://localhost:8080/api/utilisateurs';
  private url2= 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getBon_sort(numBon: string): Observable<any> {
    return this.http.get(`${this.url}/${numBon}`);
  }

  createBon_sort(bon_sort: Bon_sort): Observable<Object> {
    return this.http.post(`${this.url}`, bon_sort);
  }


  updateBon_sort(numBon: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${numBon}`, value);
  }

  deleteBon_sort(numBon: string): Observable<any> {
    return this.http.delete(`${this.url}/${numBon}`, { responseType: 'text' });
  }

  getBon_sortsList(): Observable<Bon_sort[]> {
    return this.http.get<Bon_sort[]>(`${this.url}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }


  /**drop down list add for bon sort */

  getFournisOfAdd(): Observable<any> {
    return this.http.get(`${this.url}/cod_frs`);
  }
  getArticleWithMarqueAdd(): Observable<any> {
    return this.http.get(`${this.url}/AllListMarqueNoDuplication`);
  }
  getArticleOfFromMarqueAddForBonSort(marque: string): Observable<any> {
    return this.http.get(`${this.url}/AllListArticleByMarque/${marque}`);
  }
  getArticleFromStockBS(codArticle: string): Observable<any> {
    return this.http.get(`${this.url}/ListStockByArticle/${codArticle}`);
  }
  getArticleOfAddForBonSort(): Observable<any> {
    return this.http.get(`${this.url}/AllListArticle`);
  }

  /**drop down list add for bon sort */

    /** drop list add sort */

    getArtSortForBonSort(numBon: string): Observable<any> {
      return this.http.get(`${this.url}/DetailsArtSort/${numBon}`);
    }

    createArt_sort(art_sort: Art_Sort): Observable<Object> {
      return this.http.post(`${this.url}/artSorts`, art_sort);
    }

    UpdateArtSortAnnuler(numBon: string,COD_ART: string, value: any): Observable<Object> {
      return this.http.put(`${this.url2}/${numBon}And${COD_ART}`, value);
    }
    UpdateArtSort(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.url2}/artSorts/${id}`, value);
    }
    getArt_sortsList(): Observable<Art_Sort[]> {
      return this.http.get<Art_Sort[]>(`${this.url2}/artSorts`);
    }
    getSumQutByBSht(numBon: string): Observable<Object> {
      return this.http.get(`${this.url2}/artSorts/SumQutSortHt/${numBon}`);
    }
    getSumQutByBSAREM(numBon: string): Observable<Object> {
      return this.http.get(`${this.url2}/artSorts/SumQutSortAREM/${numBon}`);
    }
    updateBonSortPrix(numBon: string, value: any): Observable<Object> {
      return this.http.put(`${this.url}/Prix/${numBon}`, value);
    }
}
