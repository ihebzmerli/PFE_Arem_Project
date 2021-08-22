import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bon_liv } from './bon-liv';
import { FormGroup } from '@angular/forms';
import { Art_liv } from './Art_Livs/art-liv';

@Injectable({
  providedIn: 'root'
})
export class BonLivService {
  public dataForm: FormGroup;
  private url= 'http://localhost:8080/api/bonLivs';
  private url2= 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }


  getBon_liv(numBon: string): Observable<any> {
    return this.http.get(`${this.url}/${numBon}`);
  }

  createBon_liv(bonliv: Bon_liv): Observable<Object> {
    return this.http.post(`${this.url}`, bonliv);
  }
  createArt_liv(art_liv: Art_liv): Observable<Object> {
    return this.http.post(`${this.url2}/artLivs`, art_liv);
  }
  updateBon_liv(NUM_BON: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${NUM_BON}`, value);
  }

  deleteBon_liv(NUM_BON: string): Observable<any> {
    return this.http.delete(`${this.url}/${NUM_BON}`, { responseType: 'text' });
  }

  getBon_livsList(): Observable<Bon_liv[]> {
    return this.http.get<Bon_liv[]>(`${this.url}`);
  }
  getArt_livsList(): Observable<Art_liv[]> {
    return this.http.get<Art_liv[]>(`${this.url2}/artLivs`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

  /** drop list add prep */
  
  getAllStockByArticle(codArt: string): Observable<any> {
    return this.http.get(`${this.url}/ListStockByArticle/${codArt}`);
  }
  getArticleOfAdd(): Observable<any> {
    return this.http.get(`${this.url}/AllListArticle`);
  }
  getArticleWithMarqueAdd(): Observable<any> {
    return this.http.get(`${this.url}/AllListMarqueNoDuplication`);
  }
  getArticleOfFromMarqueAddForBonLiv(id_model: String): Observable<any> {
    return this.http.get(`${this.url}/AllListArticleByMarque/${id_model}`);
  }
  getNumDocFactureForBonLiv(): Observable<any> {
    return this.http.get(`${this.url}/AllListNumDocNoDuplication`);
  }
  getBLEnvoyer(): Observable<any> {
    return this.http.get(`${this.url}/AllListEvoyer`);
  }

  /** drop list add liv */

  getArtLivForBonLiv(numBon: string): Observable<any> {
    return this.http.get(`${this.url}/DetailsArtLiv/${numBon}`);
  }
  getArtTermForBonLiv(numBon: string): Observable<any> {
    return this.http.get(`${this.url}/DetailsArtTerm/${numBon}`);
  }

  getAllBonLivBydateBetween(startDate: string,endDate: string): Observable<Bon_liv[]> {
    return this.http.get<Bon_liv[]>(`${this.url}/dateBetween/${startDate}to${endDate}`);
  }
  getArticlePrixAch(codArt: string) {
    return this.http.get(`${this.url}/priAcha/${codArt}`);
  }
  
  getSumQutByBLach(numBon: string): Observable<Object> {
    return this.http.get(`${this.url2}/artLivs/SumQutByBLach/${numBon}`);
  }
  getSumQutByBLht(numBon: string): Observable<Object> {
    return this.http.get(`${this.url2}/artLivs/SumQutLivHt/${numBon}`);
  }
  getSumQutByBLAREM(numBon: string): Observable<Object> {
    return this.http.get(`${this.url2}/artLivs/SumQutByBLAREM/${numBon}`);
  }

  UpdateArtLiv(numBon: string,COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${numBon}And${COD_ART}`, value);
  }

  updateBonLivPrix(numBon: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/Prix/${numBon}`, value);
  }




      /**STATISTIQUE Pie Bon liv  */

      getMaxChrono(): Observable<Object> {
        return this.http.get(`${this.url}/MaxChrono`);
      }

      getMinChrono(): Observable<Object> {
        return this.http.get(`${this.url}/MinChrono`);
      }


      getSumAvgF1(): Observable<Object> {
        return this.http.get(`${this.url}/SumAvgF1`);
      }
      getSumAvgF2(): Observable<Object> {
        return this.http.get(`${this.url}/SumAvgF2`);
      }     
      getSumAvgC1(): Observable<Object> {
        return this.http.get(`${this.url}/SumAvgC1`);
      }
      getSumAvgC2(): Observable<Object> {
        return this.http.get(`${this.url}/SumAvgC2`);
      }     
      /**STATISTIQUE Pie Bon liv  */
  getSumR(): Observable<Object> {
    return this.http.get(`${this.url}/SumR`);
  }
  getSumE(): Observable<Object> {
    return this.http.get(`${this.url}/SumE`);
  }
  
      /**STATISTIQUE Bar Bon liv */

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
