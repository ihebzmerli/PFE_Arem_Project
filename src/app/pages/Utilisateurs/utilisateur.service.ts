import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from './utilisateur';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public dataForm: FormGroup;
  
  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private url= 'http://localhost:8080/api/utilisateurs';
  private url2= 'http://localhost:8080/api/auth';
  public host : string = "http://localhost:8080/api";
  constructor(private http: HttpClient) { }

  getTest(): Observable<string> {
    return this.http.get(this.host, { responseType: 'text' });
  }
  
  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  
  getUtilisateur(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  createUtilisateur(utilisateur: Object): Observable<Object> {
    return this.http.post(`${this.url2}/signup`, utilisateur);
  }

  updateUtilisateur(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteUtilisateur(id: bigint): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getUtilisateursList(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.url}`);
  }

  getAllPreparateur(): Observable<any> {
    return this.http.get(`${this.url}/Preparateur`);
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.url}/Roles`);
  }

  getIdUserByUsername(username: string): Observable<Object> {
    return this.http.get(`${this.url}/username/${username}`);
  }
/*
  getAllPreparateurList(): Observable<any> {
    return this.http.get(`${this.url}/Preparateurs`);
  }
  */



  /**utilisateur modification */
  ChangeRoleToUSER(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToUSER/${id}`);
  }
  ChangeRoleToADMIN(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToADMIN/${id}`);
  }
  ChangeRoleToACHETEUR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToACHETEUR/${id}`);
  }
  ChangeRoleToTRANSITAIRE(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToTRANSITAIRE/${id}`);
  }
  ChangeRoleToCLIENT(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToCLIENT/${id}`);
  }
  ChangeRoleToVENDEUR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToVENDEUR/${id}`);
  }
  ChangeRoleToDECIDEUR_BP(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToDECIDEUR_BP/${id}`);
  }
  ChangeRoleToAGENT_CAB(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToAGENT_CAB/${id}`);
  }
  ChangeRoleToPREPARATEUR_BR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToPREPARATEUR_BR/${id}`);
  }
  ChangeRoleToRESPONSABLE_DISPATCHING_BP(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToRESPONSABLE_DISPATCHING_BP/${id}`);
  }
  ChangeRoleToPREPARATEUR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToPREPARATEUR/${id}`);
  }
  ChangeRoleToVALIDATEUR_DE_CHARIOT(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToVALIDATEUR_DE_CHARIOT/${id}`);
  }
  ChangeRoleToRESPONSABLE_POINTAGE(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToRESPONSABLE_POINTAGE/${id}`);
  }
  ChangeRoleToEMBALLEUR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToEMBALLEUR/${id}`);
  }
  ChangeRoleToEXPEDITEUR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToEXPEDITEUR/${id}`);
  }
  ChangeRoleToAGENT_SAISIE_REG(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToAGENT_SAISIE_REG/${id}`);
  }
  ChangeRoleToCAISSIER(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToCAISSIER/${id}`);
  }
  ChangeRoleToRESPONSABLE_SERVICE_FRS_ETRANGER(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToRESPONSABLE_SERVICE_FRS_ETRANGER/${id}`);
  }
  ChangeRoleToRESPONSABLE_SERVICE_FRS_LOCAL(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToRESPONSABLE_SERVICE_FRS_LOCAL/${id}`);
  }
  ChangeRoleToLIVREUR(id): Observable<Object> {
    return this.http.get(`${this.url}/RoleToLIVREUR/${id}`);
  }
  /**modification */







    /**STATISTIQUE Pie Bon liv  */
    getSumROLE_USER(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_USER`);
    }
    getSumROLE_ADMIN(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_ADMIN`);
    }
    getSumROLE_ACHETEUR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_ACHETEUR`);
    }
    getSumROLE_TRANSITAIRE(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_TRANSITAIRE`);
    }
    getSumROLE_CLIENT(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_CLIENT`);
    }
    getSumROLE_VENDEUR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_VENDEUR`);
    }
    getSumROLE_DECIDEUR_BP(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_DECIDEUR_BP`);
    }
    getSumROLE_AGENT_CAB(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_AGENT_CAB`);
    }
    getSumROLE_PREPARATEUR_BR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_PREPARATEUR_BR`);
    }
    getSumROLE_RESPONSABLE_DISPATCHING_BP(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_RESPONSABLE_DISPATCHING_BP`);
    }
    getSumROLE_PREPARATEUR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_PREPARATEUR`);
    }
    getSumROLE_VALIDATEUR_DE_CHARIOT(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_VALIDATEUR_DE_CHARIOT`);
    }
    getSumROLE_RESPONSABLE_POINTAGE(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_RESPONSABLE_POINTAGE`);
    }
    getSumROLE_EMBALLEUR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_EMBALLEUR`);
    }
    getSumROLE_EXPEDITEUR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_EXPEDITEUR`);
    }
    getSumROLE_AGENT_SAISIE_REG(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_AGENT_SAISIE_REG`);
    }
    getSumROLE_CAISSIER(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_CAISSIER`);
    }
    getSumROLE_RESPONSABLE_SERVICE_FRS_ETRANGER(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_RESPONSABLE_SERVICE_FRS_ETRANGER`);
    }
    getSumROLE_RESPONSABLE_SERVICE_FRS_LOCAL(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_RESPONSABLE_SERVICE_FRS_LOCAL`);
    }
    getSumROLE_LIVREUR(): Observable<Object> {
      return this.http.get(`${this.url}/SumROLE_LIVREUR`);
    }
}
