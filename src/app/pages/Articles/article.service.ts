import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public dataForm: FormGroup;
  private url= 'http://localhost:8080/api/articles';
  private urltest= 'http://localhost:8080/api/articlesTest';
  private url2= 'http://localhost:8080/api';
  host : string = "http://localhost:8080";
  constructor(private http: HttpClient) { }


  getArticle(COD_ART: string): Observable<any> {
    return this.http.get(`${this.url}/${COD_ART}`);
  }

  createArticle(article: Article): Observable<Object> {
    return this.http.post(`${this.url}`, article);
  }

  createArticle2(formData: FormData): Observable<Object> {
    return this.http.post(`${this.urltest}`, formData);
  }

  updateArticle(COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${COD_ART}`, value);
  }

  deleteArticle(COD_ART: string): Observable<any> {
    return this.http.delete(`${this.url}/${COD_ART}`, { responseType: 'text' });
  }

  getArticlesList(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}`);
  }


/********************* Model *********/
  getAllModelsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url2}/models`);
  }
  getAllModelByMarque(marque_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url2}/models/getByMarque/${marque_id}`);
  }



  deleteAll(): Observable<any> {
    return this.http.delete(this.url);
  }

  UpdateStkArticle(COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${COD_ART}`, value);
  }
  UpdateStkArticleOut(COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/OUT/${COD_ART}`, value);
  }
  public getZoneArticle(centre: string,codArticle: string): Observable<any> {
    return this.http.get(`${this.url}/ZONE/${centre}and${codArticle}`);
  }

  resetArticle(COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/resetSTK/${COD_ART}`, value);
  }

  getMarquesList(): Observable<any> {
    return this.http.get(`${this.url}/AllListMarque`);
  }
  updateChangeAllArticle(COD_ART: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/ChangeAll/${COD_ART}`, value);
  }

  getAllArticleBydateBetweenDAT_CREAT(startDate: string,endDate: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/dateBetweenDAT_CREAT/${startDate}to${endDate}`);
  }
  getAllArticleBydateBetweenDER_ACH(startDate: string,endDate: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/dateBetweenDER_ACH/${startDate}to${endDate}`);
  }
  getAllArticleBydateBetweenDER_MVT(startDate: string,endDate: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/dateBetweenDER_MVT/${startDate}to${endDate}`);
  }
  getAllArticleBydateBetweenDAT_RUP(startDate: string,endDate: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/dateBetweenDAT_RUP/${startDate}to${endDate}`);
  }
  getAllArticleBydateBetweenDAT_PACH(startDate: string,endDate: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/dateBetweenDAT_PACH/${startDate}to${endDate}`);
  }




  /**STATISTIQUE Article */

  getSum1(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS1`);
  }
  getSum2(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS2`);
  }
  getSum3(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS3`);
  }
  getSum4(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS4`);
  }
  getSum5(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS5`);
  }
  getSum6(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS6`);
  }
  getSum7(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS7`);
  }
  getSum8(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS8`);
  }
  getSum9(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS9`);
  }
  getSum10(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS10`);
  }
  getSum11(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS11`);
  }
  getSum12(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS12`);
  }
  getSum13(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS13`);
  }
  getSum14(): Observable<Object> {
    return this.http.get(`${this.url}/SumSTKS14`);
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



    /***********upload image */

    
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.url2}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.url2}/files`);
  }
}
