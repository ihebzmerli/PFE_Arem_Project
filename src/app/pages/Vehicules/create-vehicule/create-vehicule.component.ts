import { Component, OnInit } from '@angular/core';
import { Vehicule } from '../vehicule';
import { Router } from '@angular/router';
import { VehiculeService } from '../vehicule.service';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbDateService,
  NbDialogService,
} from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Marque } from '../../Marques/marque';
import { Model } from '../../Model/model';
import { ArticleService } from '../../Articles/article.service';
import { MarqueService } from '../../Marques/marque.service';
import { AddMarqueDialogComponent } from '../../Articles/create-article/windowAjoutMarque/add-marque-dialog.component';
import { AddModelDialogComponent } from '../../Articles/create-article/windowAjoutModel/add-model-dialog.component';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';

@Component({
  selector: 'ngx-create-vehicule',
  templateUrl: './create-vehicule.component.html',
  styleUrls: ['./create-vehicule.component.scss']
})
export class CreateVehiculeComponent implements OnInit {

  vehiculeForm: FormGroup;
  submitted = false;
  /** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  min: Date;
  max: Date;
  color2: string = "#1976D2";
  vehiculemarque;
  vehiculemodel;
  selected = null;
/** ********************* */
 
vehicule: Vehicule = new Vehicule();

constructor(private authService: TokenStorageService,private toastrService: NbToastrService, private vehiculeService: VehiculeService,
    private router: Router,protected dateService: NbDateService<Date>,public articleService:ArticleService,private dialogService: NbDialogService,public marqueService:MarqueService) {
      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
     }

    ngOnInit() {
      this.getVehicules();
      this.getAllMarquesList();
    }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    saveVehicule() {
      if(this.vehicule.dt1Mc!=null){
        this.vehicule.dt1Mc=new Date(this.vehicule.dt1Mc.toLocaleString());
        this.vehicule.dt1Mc.setMinutes( this.vehicule.dt1Mc.getMinutes() + 60);
        }else{
          this.vehicule.dt1Mc=null;
        }
        if(this.vehicule.dtAcq!=null){
          this.vehicule.dtAcq=new Date(this.vehicule.dtAcq.toLocaleString());
          this.vehicule.dtAcq.setMinutes( this.vehicule.dtAcq.getMinutes() + 60);
          }else{
            this.vehicule.dtAcq=null;
          }
          if(this.vehicule.dtFAss!=null){
            this.vehicule.dtFAss=new Date(this.vehicule.dtFAss.toLocaleString());
            this.vehicule.dtFAss.setMinutes( this.vehicule.dtFAss.getMinutes() + 60);
            }else{
              this.vehicule.dtFAss=null;
            }
            if(this.vehicule.dtFVisit!=null){
              this.vehicule.dtFVisit=new Date(this.vehicule.dtFVisit.toLocaleString());
              this.vehicule.dtFVisit.setMinutes( this.vehicule.dtFVisit.getMinutes() + 60);
              }else{
                this.vehicule.dtFVisit=null;
              }
              if(this.vehicule.dt1Mc2!=null){
                this.vehicule.dt1Mc2=new Date(this.vehicule.dt1Mc2.toLocaleString());
                this.vehicule.dt1Mc2.setMinutes( this.vehicule.dt1Mc2.getMinutes() + 60);
                }else{
                  this.vehicule.dt1Mc2=null;
                }
      this.vehicule.couleur= this.color2;
      this.vehicule.marque=this.vehiculemarque;
      this.vehicule.model=this.vehiculemodel;
        this.vehiculeService.createVehicule(this.vehicule).subscribe( data =>{
          console.log(data);
        },
        error => console.log(error));
      }

    async onSubmitVehicule() {
        console.log(this.vehicule);
          var target=this.vehicules.find(temp=>temp.matricule==this.vehicule.matricule);
          console.log(target);
        if(target){
          return this.makeToast4();
        }
        else if(!target){
        await this.saveVehicule();  
        await this.delay(2000);
        await this.makeToast(); 
        this.vehicule_list(); 
        }
      }

      vehicule_list(){
        this.router.navigate(['//pages/Vehicules/vehicule-list']);
      }
  /**toaster show start */
  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 4000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  
  status: NbComponentStatus = 'success';
  
  title = 'La modification faite avec succée!';
  content = `La prime a été modifier!`;
  
  status2: NbComponentStatus = 'danger';
  
  title2 = 'La modification n est pas faite avec succée!';
  content2 = `Erreur de modification!`;
  
  status3: NbComponentStatus = 'warning';
  
  title3 = 'La modification n est pas faite!';
  content3 = `La modification n'a rien changé!`;

  status4: NbComponentStatus = 'warning';

  title4 = 'L addition n`est pas faite matricule Existe deja!';
  content4 = `saisir n'est pas fait!`;
  types: NbComponentStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];
  
  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];
  
  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  makeToast2() {
    this.showToast(this.status2, this.title2, this.content2);
  }
  makeToast3() {
    this.showToast(this.status3, this.title3, this.content3);
  }
  makeToast4() {
    this.showToast(this.status4, this.title4, this.content4);
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';
  
    this.index += 1;
    this.toastrService.show(
      body,
      `Notif ${this.index}${titleContent}`,
      config);
  }
  /**toaster show start */   

/**toaster show start */ 
MarqueList: Marque[];
ModelFromMarque:Model[];
MarqueSelected:String;
ModelSelected:String;
public getModeleFromMarque(itemsMarquee :any) {

  if(itemsMarquee){ 
    this.articleService.getAllModelByMarque(itemsMarquee.id).subscribe(data => {
      this.ModelFromMarque = data;
      console.log(data);
    });
  }
}
public getAllMarquesList() {
  this.marqueService.getMarquesList().subscribe(data => {
    this.MarqueList = data;
    console.log(this.MarqueList);
  });
}


/** end upload image article */
vehicules: Vehicule[];
private getVehicules() {
  this.vehiculeService.getVehiculesList().subscribe(data => {
    this.vehicules = data;
    console.log(data);
  });
}
}
