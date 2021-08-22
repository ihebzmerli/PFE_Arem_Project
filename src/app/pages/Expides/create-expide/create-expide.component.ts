import { Component, OnInit } from '@angular/core';
import { Expide } from '../expide';
import { Router } from '@angular/router';
import { ExpideService } from '../expide.service';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
  NbToastrConfig,
  NbDateService,
  NbComponentShape,
  NbComponentSize,
} from '@nebular/theme';
import { Bon_liv } from '../../Bon_Livs/bon-liv';
import { BonLivService } from '../../Bon_Livs/bon-liv.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Livreur } from '../../Livreurs/livreur';
import { Vehicule } from '../../Vehicules/vehicule';
import { AbstractControl, FormGroup, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Livreur_Expide } from '../LivreurBonliv/Livreur_Expide';
import { DatePipe } from '@angular/common';
import { PagesComponent } from '../../pages.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { LivreurService } from '../../Livreurs/livreur.service';

@Component({
  selector: 'ngx-create-expide',
  templateUrl: './create-expide.component.html',
  styleUrls: ['./create-expide.component.scss']
})
export class CreateExpideComponent implements OnInit,Validator {
  expideForm1: FormGroup;
  expideForm2: FormGroup;
  /** teamplate Ajouter */
    starRate = 2;
    heartRate = 4;
    radioGroupValue = 'This is value 2';

    min: Date;
    max: Date;
    BonLivList: Bon_liv [];
    selectedBon: Bon_liv[];
    LivreurList: Livreur [];
    selectedLivreur: Livreur;
    VehiculeList: Vehicule [];
    selectedVehicule: Vehicule;

    affectationDisable : Boolean=false;
    selected = null;
  /** ********************* */
  
  expide: Expide = new Expide();
  livreur_expide: Livreur_Expide = new Livreur_Expide();
  submitted = false;
  
  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
  
  constructor(private livreurService: LivreurService,private authService: TokenStorageService,public datepipe: DatePipe,public bonlivService: BonLivService, private toastrService: NbToastrService, private expideService: ExpideService,
      private router: Router,protected dateService: NbDateService<Date>) {
        this.min = this.dateService.addDay(this.dateService.today(), -5);
        this.max = this.dateService.addDay(this.dateService.today(), 5);
       }
  validate(control: AbstractControl): ValidationErrors {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
      ngOnInit() {
        
        const now = Date.now()
        const myFormattedDate = this.datepipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
            this.getBonLivOfAdd();
            this.getLivreurOfAdd();
            this.getVehiculeOfAdd();

      }
  
      isDisable:boolean=false;
      saveExpide() {
          this.expideService.createExpide(this.expide).subscribe( data =>{
            console.log(data);
          },
          error => console.log(error));
          this.isDisable=true;
        }


      gotoListExpide() {
        this.router.navigate(['//pages/Expides/expide-list']);
      }

      async onSubmitExpide1() {
          this.saveExpide();
          this.makeToast();
          this.affectationDisable = !this.affectationDisable;
        }

      async onSubmitExpide2() {
        this.gotoListExpide(); 
        this.makeToast();  
      }     

      /** toaster show start */
      config: NbToastrConfig;

      index = 1;
      destroyByClick = true;
      duration = 2000;
      hasIcon = true;
      position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
      preventDuplicates = false;
      
      status: NbComponentStatus = 'success';
      
      title = 'L\'ajout faite avec succée!';
      content = `L\'expedition a été modifier!`;

      status2: NbComponentStatus = 'danger';
        
      title2 = 'L\'ajout n\'est pas fait avec succée!';
      content2 = `Erreur de saisi!`;
     
      


      status3: NbComponentStatus = 'warning';
        
      title3 = 'Des probleme de saisi!';
      content3 = `Seulement 5 bon de livraison comme un maximum a un livreur!`;


      
      status4: NbComponentStatus = 'warning';
        
      title4 = 'Des probleme de saisi!';
      content4 = `Seulement 1 bon de livraison comme un minimum a un livreur!`;

      status5: NbComponentStatus = 'info';

      title5 = 'L\'addition est en cours !';
      content5 = `Veuillez attendre le traitement des données!`;
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
      makeToast5() {
        this.showToast(this.status5, this.title5, this.content5);
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

/** incrementation est decrementation  */


/** add drop lists */

public getBonLivOfAdd() {
  this.bonlivService.getBLEnvoyer().subscribe(data => {
    this.BonLivList = data;
  });
}

public getLivreurOfAdd() {
  this.expideService.getLivreurOfAdd().subscribe(data => {
    this.LivreurList = data;
  });
}

public getVehiculeOfAdd() {
  this.expideService.getVehiculeOfAdd().subscribe(data => {
    this.VehiculeList = data;
  });
}
/** */




//*** affectation des livreur au B L */
selectedLivreur1:Livreur;
selectedLivreur2:Livreur;
selectedLivreur3:Livreur;
selectedLivreur4:Livreur;
selectedLivreur5:Livreur;
selectedLivreur6:Livreur;
selectedLivreur7:Livreur;
selectedLivreur8:Livreur;
selectedLivreur9:Livreur;
selectedLivreur10:Livreur;
selectedLivreur11:Livreur;
selectedLivreur12:Livreur;
selectedLivreur13:Livreur;
selectedLivreur14:Livreur;
selectedLivreur15:Livreur;
selectedLivreur16:Livreur;
selectedLivreur17:Livreur;
selectedLivreur18:Livreur;
selectedLivreur19:Livreur;

selectedVehicule1;
selectedVehicule2;
selectedVehicule3;
selectedVehicule4;
selectedVehicule5;
selectedVehicule6;
selectedVehicule7;
selectedVehicule8;
selectedVehicule9;
selectedVehicule10;
selectedVehicule11;
selectedVehicule12;
selectedVehicule13;
selectedVehicule14;
selectedVehicule15;
selectedVehicule16;
selectedVehicule17;
selectedVehicule18;
selectedVehicule19;

selectedBon11:Bon_liv[];
selectedBon21:Bon_liv[];
selectedBon31:Bon_liv[];
selectedBon41:Bon_liv[];
selectedBon51:Bon_liv[];
selectedBon61:Bon_liv[];
selectedBon71:Bon_liv[];
selectedBon81:Bon_liv[];
selectedBon91:Bon_liv[];
selectedBon101:Bon_liv[];
selectedBon111:Bon_liv[];
selectedBon121:Bon_liv[];
selectedBon131:Bon_liv[];
selectedBon141:Bon_liv[];
selectedBon151:Bon_liv[];
selectedBon161:Bon_liv[];
selectedBon171:Bon_liv[];
selectedBon181:Bon_liv[];
selectedBon191:Bon_liv[];

dis1:boolean=false;
dis2:boolean=false;
dis3:boolean=false;
dis4:boolean=false;
dis5:boolean=false;
dis6:boolean=false;
dis7:boolean=false;
dis8:boolean=false;
dis9:boolean=false;
dis10:boolean=false;
dis11:boolean=false;
dis12:boolean=false;
dis13:boolean=false;
dis14:boolean=false;
dis15:boolean=false;
dis16:boolean=false;
dis17:boolean=false;
dis18:boolean=false;
dis19:boolean=false;

IFselectedLiv1:number=1;
bonliv: Bon_liv = new Bon_liv();
id_testExp;
switchMe:boolean=true;
public async AddSelectedBon1() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur1.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule1.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon11.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon11.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon11[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur1.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur1.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon11[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis1=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon2() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur2.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule2.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon21.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon21.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon21[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur2.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur2.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon21[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis2=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon3() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur3.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule3.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon31.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon31.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon31[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur3.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur3.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon31[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis3=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon4() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur4.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule4.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon41.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon41.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon41[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur4.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur4.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon41[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis4=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon5() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur5.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule5.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon51.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon51.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon51[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur5.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur5.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon51[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis5=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon6() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur6.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule6.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon61.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon61.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon61[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur6.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur6.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon61[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis6=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon7() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur7.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule7.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon71.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon71.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon71[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur7.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur7.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon71[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis7=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon8() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur8.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule8.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon81.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon81.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon81[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur8.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur8.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon81[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis8=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon9() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur9.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule9.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon91.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon91.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon91[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur9.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur9.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon91[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis9=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon10() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur10.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule10.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon101.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon101.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon101[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur10.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur10.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon101[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis10=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon11() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur11.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule11.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon111.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon111.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon111[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur11.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur11.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon111[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis11=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon12() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur12.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule12.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon121.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon121.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon121[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur12.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur12.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon121[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis12=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon13() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur13.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule13.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon131.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon131.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon131[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur13.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur13.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon131[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis13=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon14() {
 
  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur14.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule14.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon141.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon141.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon141[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur14.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur14.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon141[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis14=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon15() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur15.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule15.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon151.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon151.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon151[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur15.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur15.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon151[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis15=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon16() {

  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur16.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule16.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon161.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon161.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon161[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur16.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur16.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon161[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis16=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon17() {
 
  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur17.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule17.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon171.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon171.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon171[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur17.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur17.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon171[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis17=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon18() {
 
  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur18.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule18.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon181.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon181.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon181[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur18.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur18.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon181[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis18=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddSelectedBon19() {
 
  this.expideService.getLastId().subscribe(data => {
    this.id_testExp = data;

  
  this.livreur_expide.id_expide=this.id_testExp[0];
  console.log(this.livreur_expide.id_expide);
  this.livreur_expide.id_livreur=this.selectedLivreur19.id_livreur;
  this.livreur_expide.matricule=this.selectedVehicule19.matricule;
  console.log(this.livreur_expide);
    let counter = 0;
    for (let i = 0; i < this.selectedBon191.length; i++) {
      counter++;
    }
  if(counter<=4 && counter>0){
    for (let i = 0; i < this.selectedBon191.length; i++) {
      this.livreur_expide.bonLiv=this.selectedBon191[i];
      console.log(this.livreur_expide);

      this.expideService.createLivreurs_Expides(this.livreur_expide).subscribe( data =>{
        console.log(data);
      },
      error => console.log(error));
      console.log(this.selectedLivreur19.id_livreur.toString());
      this.livreurService.getLivreur(this.selectedLivreur19.id_livreur.toString()).subscribe(data => {
        this.bonliv.livreur = data;
        console.log(this.bonliv.livreur);
        console.log(this.bonliv);
        this.bonlivService.updateBon_liv(this.selectedBon191[i].numBon,this.bonliv).subscribe(data => {
          console.log(data);
      });;
      }, error => console.log(error));
    }
    this.dis19=true;
    this.switchMe=!this.switchMe;
    this.makeToast();
  }else{
    this.makeToast3();
  }  
});
}
public AddLivreur() {
  if(this.IFselectedLiv1<20){
    this.getBonLivOfAdd();
    this.IFselectedLiv1=this.IFselectedLiv1+1;
    this.switchMe=!this.switchMe;
  }
}

}
  