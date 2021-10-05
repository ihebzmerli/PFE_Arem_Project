import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bon_prep } from './bon-prep';
import { Article } from '../Articles/article';
import { FormGroup } from '@angular/forms';
import { Art_Prep } from './Art_Preps/art-prep';

@Injectable({
  providedIn: 'root'
})
export class BonPrepService {
  public dataForm: FormGroup;
  private url= 'http://localhost:8080/api/bonPreps';
  private url2= 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getBon_prep(numBon: string): Observable<any> {
    return this.http.get(`${this.url}/${numBon}`);
  }

  createBon_prep(bonprep: Bon_prep): Observable<Object> {
    return this.http.post(`${this.url}`, bonprep);
  }
  createArt_prep(art_prep: Art_Prep): Observable<Object> {
    return this.http.post(`${this.url2}/artPreps`, art_prep);
  }
  updateBon_prep(NUM_BON_PREP: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${NUM_BON_PREP}`, value);
  }
  UpdateArtPrepAnnuler(numBon: string,COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url2}/${numBon}And${COD_ART}`, value);
  }
  UpdateArtPrep(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url2}/artPreps/${id}`, value);
  }
  deleteBon_prep(NUM_BON_PREP: string): Observable<any> {
    return this.http.delete(`${this.url}/${NUM_BON_PREP}`, { responseType: 'text' });
  }

  getBon_prepsList(): Observable<Bon_prep[]> {
    return this.http.get<Bon_prep[]>(`${this.url}`);
  }
  getArt_prepsList(): Observable<Art_Prep[]> {
    return this.http.get<Art_Prep[]>(`${this.url2}/artPreps`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }
  UpdateArtPrepPointage(numBon: string,COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url2}/artPreps/${numBon}And${COD_ART}`, value);
  }

  /** drop list add prep */
  getAllStockByArticle(codArt: string): Observable<any> {
    return this.http.get(`${this.url}/ListStockByArticle/${codArt}`);
  }

  getArticleOfFromMarqueAddForBonPrep(marque: string): Observable<any> {
    return this.http.get(`${this.url}/AllListArticleByMarque/${marque}`);
  }


  getArticleOfAdd(): Observable<any> {
    return this.http.get(`${this.url}/miniListArticle`);
  }

  getChariotOfAdd(): Observable<any> {
    return this.http.get(`${this.url}/allListChar`);
  }

  getExpideOfAdd(): Observable<any> {
    return this.http.get(`${this.url}/allListExpide`);
  }

  getAchatOfAdd(): Observable<any> {
    return this.http.get(`${this.url}/AllListAchats`);
  }

  /**end drop  */
  
  getAllBonPrepBydateBetween(startDate: string,endDate: string): Observable<Bon_prep[]> {
    return this.http.get<Bon_prep[]>(`${this.url}/dateBetween/${startDate}to${endDate}`);
  }

  /* filter date*/

  getArtPrepForBonPrep(numBon: string): Observable<any> {
    return this.http.get(`${this.url}/DetailsArtPrep/${numBon}`);
  }

  getSumQutByBPach(numBon: string): Observable<Object> {
    return this.http.get(`${this.url2}/artPreps/SumQutPrepach/${numBon}`);
  }
  getSumQutByBPht(numBon: string): Observable<Object> {
    return this.http.get(`${this.url2}/artPreps/SumQutPrepHt/${numBon}`);
  }
  getSumQutByBPAREM(numBon: string): Observable<Object> {
    return this.http.get(`${this.url2}/artPreps/SumQutPrepAREM/${numBon}`);
  }
  updateBonPrepPrix(numBon: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/Prix/${numBon}`, value);
  }










  
        /**STATISTIQUE bar horisontale Bon prep */
        getSumD1(): Observable<Object> {
          return this.http.get(`${this.url}/SumD1`);
        }
        getSumD2(): Observable<Object> {
          return this.http.get(`${this.url}/SumD2`);
        }
        getSumD3(): Observable<Object> {
          return this.http.get(`${this.url}/SumD3`);
        }
        getSumD4(): Observable<Object> {
          return this.http.get(`${this.url}/SumD4`);
        }
        /**STATISTIQUE Pie Bon prep */
        getSumC(): Observable<Object> {
          return this.http.get(`${this.url}/SumC`);
        }
        getSumL(): Observable<Object> {
          return this.http.get(`${this.url}/SumL`);
        }

        /**STATISTIQUE Bar Bon prep */

        getSumBar1B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar1`);
        }
        getSumBar2B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar2`);
        }
        getSumBar3B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar3`);
        }
        getSumBar4B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar4`);
        }
        getSumBar5B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar5`);
        }
        getSumBar6B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar6`);
        }
        getSumBar7B(): Observable<Object> {
          return this.http.get(`${this.url}/SumBar7`);
        }
}
