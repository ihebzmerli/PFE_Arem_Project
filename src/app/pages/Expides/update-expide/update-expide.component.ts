import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbDateService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Bon_liv } from '../../Bon_Livs/bon-liv';
import { BonLivService } from '../../Bon_Livs/bon-liv.service';
import { Livreur } from '../../Livreurs/livreur';
import { LivreurService } from '../../Livreurs/livreur.service';
import { PagesComponent } from '../../pages.component';
import { Vehicule } from '../../Vehicules/vehicule';
import { VehiculeService } from '../../Vehicules/vehicule.service';
import { Expide } from '../expide';
import { ExpideService } from '../expide.service';
import { Livreur_Expide } from '../LivreurBonliv/Livreur_Expide';

@Component({
  selector: 'ngx-update-expide',
  templateUrl: './update-expide.component.html',
  styleUrls: ['./update-expide.component.scss']
})
export class UpdateExpideComponent implements OnInit {
  expideForm1: FormGroup;
  expideForm2: FormGroup;
  submitted = false;
  numBon: string;
  expide: Expide = new Expide();
  livreur_expides: Livreur_Expide[];
  editForm: FormGroup;
  items :any;
  selectedTyp:any;
  id: string;

  /** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';

  min: Date;
  max: Date;

  affectationDisable : Boolean=false;
  selected = null;
  /** ********************* */
  livreur_expide: Livreur_Expide = new Livreur_Expide();

  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];

  constructor(private livreurService: LivreurService,private route: ActivatedRoute,private router: Router,private authService: TokenStorageService,public datepipe: DatePipe,public bonlivService: BonLivService, private toastrService: NbToastrService, private expideService: ExpideService, private vehiculeService: VehiculeService,protected dateService: NbDateService<Date>) {
        this.min = this.dateService.addDay(this.dateService.today(), -5);
        this.max = this.dateService.addDay(this.dateService.today(), 5);
      }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
    counterTEst=0;
    selectedDefault= [];
    selectedItemDisplay: string;
    /*
    changeSensorsList(e){
      this.BonLivList = e.value.map((item) => item.name);
      if(this.BonLivList.length > 3){
        this.selectedItemDisplay =`Selected item : ${this.BonLivList.join(', ')}`;
      }else{
        this.selectedItemDisplay ='';
      }

      this.BonLivList.map((item) => this.selectedDefault.push(item.numBon));
      console.log(this.selectedDefault);
    }
    */

  ngOnInit() {
    



    this.getBonLivOfAdd();
    this.getLivreurOfAdd();
    this.getVehiculeOfAdd();

    this.expide = new Expide();

    this.id = this.route.snapshot.params['id'];
    
    this.expideService.getExpide(this.id)
      .subscribe(data => {
        console.log(data)
        this.expide = data;
      }, error => console.log(error));

      this.expideService.getAllLivreursAndBonliv(this.id)
      .subscribe(data1 => {
        console.log(data1)
        this.livreur_expides = data1;
        
        if(data1!=null){
        var livreur_expides = this.livreur_expides.reduce(function (r, a){
          r[a.id_livreur.toString()] =r[a.id_livreur.toString()] || [];
          r[a.id_livreur.toString()].push(a);
          return r;
        }, Object.create(null));

        console.log(livreur_expides)
        
        this.counterTEst = 0;
        for (let i = 0; i < Object.values(livreur_expides).length; i++) {
          this.counterTEst++;
        }
        
          console.log(livreur_expides[8]);

        

        if(this.counterTEst>=1){
          var obj = {};
          for (var i = 0; i < livreur_expides.length; i++) {
          this.livreurService.getLivreur(Object.values(livreur_expides).toString())
          .subscribe(data => {
            this.selectedLivreur1=data;
          }, error => console.log(error));


          this.vehiculeService.getVehicule(obj[livreur_expides[i]].matricule)
          .subscribe(data => {
            this.selectedVehicule1=data;
          }, error => console.log(error));
        }

        }
        if(this.counterTEst>=2){
          this.livreurService.getLivreur(this.livreur_expides[1].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur2=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[1].matricule)
          .subscribe(data => {
            this.selectedVehicule2=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=3){
          this.livreurService.getLivreur(this.livreur_expides[2].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur3=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[2].matricule)
          .subscribe(data => {
            this.selectedVehicule3=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=4){
          this.livreurService.getLivreur(this.livreur_expides[3].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur4=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[3].matricule)
          .subscribe(data => {
            this.selectedVehicule4=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=5){
          this.livreurService.getLivreur(this.livreur_expides[4].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur5=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[4].matricule)
          .subscribe(data => {
            this.selectedVehicule5=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=6){
          this.livreurService.getLivreur(this.livreur_expides[5].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur6=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[5].matricule)
          .subscribe(data => {
            this.selectedVehicule6=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=7){
          this.livreurService.getLivreur(this.livreur_expides[6].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur7=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[6].matricule)
          .subscribe(data => {
            this.selectedVehicule7=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=8){
          this.livreurService.getLivreur(this.livreur_expides[7].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur8=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[7].matricule)
          .subscribe(data => {
            this.selectedVehicule8=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=9){
          this.livreurService.getLivreur(this.livreur_expides[8].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur9=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[8].matricule)
          .subscribe(data => {
            this.selectedVehicule9=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=10){
          this.livreurService.getLivreur(this.livreur_expides[9].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur10=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[9].matricule)
          .subscribe(data => {
            this.selectedVehicule10=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=11){
          this.livreurService.getLivreur(this.livreur_expides[10].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur11=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[10].matricule)
          .subscribe(data => {
            this.selectedVehicule11=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=12){
          this.livreurService.getLivreur(this.livreur_expides[11].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur12=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[11].matricule)
          .subscribe(data => {
            this.selectedVehicule12=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=13){
          this.livreurService.getLivreur(this.livreur_expides[12].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur13=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[12].matricule)
          .subscribe(data => {
            this.selectedVehicule13=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=14){
          this.livreurService.getLivreur(this.livreur_expides[13].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur14=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[13].matricule)
          .subscribe(data => {
            this.selectedVehicule14=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=15){
          this.livreurService.getLivreur(this.livreur_expides[14].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur15=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[14].matricule)
          .subscribe(data => {
            this.selectedVehicule15=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=16){
          this.livreurService.getLivreur(this.livreur_expides[15].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur16=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[15].matricule)
          .subscribe(data => {
            this.selectedVehicule16=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=17){
          this.livreurService.getLivreur(this.livreur_expides[16].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur17=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[16].matricule)
          .subscribe(data => {
            this.selectedVehicule17=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=18){
          this.livreurService.getLivreur(this.livreur_expides[17].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur18=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[17].matricule)
          .subscribe(data => {
            this.selectedVehicule18=data;
          }, error => console.log(error));

        }
        if(this.counterTEst>=19){
          this.livreurService.getLivreur(this.livreur_expides[18].id_livreur.toString())
          .subscribe(data => {
            this.selectedLivreur19=data;
          }, error => console.log(error));

          this.vehiculeService.getVehicule(this.livreur_expides[18].matricule)
          .subscribe(data => {
            this.selectedVehicule19=data;
          }, error => console.log(error));

        }

        this.IFselectedLiv1=this.counterTEst;
        console.log(this.IFselectedLiv1);
      }else if(data1==null){
        alert("azazazazazazazaz");
      }
      }, error => console.log(error));
  }

    isDisable:boolean=false;
    async onSubmitExpide1() {
      this.updateExpide();
      await this.showModalDialogBarProgression();
      this.makeToast(); 
      this.affectationDisable = !this.affectationDisable;
    }

    updateExpide(){  
      this.expideService.updateExpide(this.id,this.expide).subscribe(data => {
        console.log(data);
        this.expide = new Expide();
      }, error => console.log(error));
      this.isDisable=true;
    }
    gotoListExpide() {
      this.router.navigate(['//pages/Expides/expide-list']);
    }

    async onSubmitExpide2() {
      this.gotoListExpide(); 
      this.makeToast();  
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
content = `L Expedition a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status3: NbComponentStatus = 'warning';
        
title3 = 'des probleme de saisi!';
content3 = `seulement 5 bon de livraison comme un maximum a un livreur!`;



      
status4: NbComponentStatus = 'warning';
        
title4 = 'des probleme de saisi!';
content4 = `seulement 1 bon de livraison comme un minimum a un livreur!`;

status5: NbComponentStatus = 'info';

title5 = 'L addition est en cours !';
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
/** progression bar */

progress=0;
displayModalBarProgression: boolean;
  async showModalDialogBarProgression() {
  this.progress=0;
  this.displayModalBarProgression = true;
  this.makeToast5();
  await this.delay(1000);
  this.progress=15;
  await this.delay(1000);
  this.progress=37;
  await this.delay(1000);
  this.progress=62;
  await this.delay(1000);
  this.progress=87;
  await this.delay(1000);
  this.progress=99;
  await this.delay(500);
  this.progress=100;
  this.delay(1500);
  this.displayModalBarProgression=false;
}


/**end progression bar */


/** add drop lists */

BonLivList: Bon_liv [];
selectedBon: Bon_liv [];
LivreurList: Livreur [];
selectedLivreur: Livreur [];
VehiculeList: Vehicule [];
selectedVehicule: Vehicule [];

public getBonLivOfAdd() {
  this.expideService.getBonLivOfAdd().subscribe(data => {
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
  this.expideService.getExpide(this.id)
  .subscribe(data => {
    this.expide = data;
    this.livreur_expide.id_expide=this.expide.id;
  
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}, error => console.log(error));  
}
public AddSelectedBon2() {

  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon3() {

  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon4() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon5() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon6() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon7() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon8() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon9() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon10() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon11() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon12() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon13() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon14() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon15() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon16() { 
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon17() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon18() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddSelectedBon19() {
  this.livreur_expide.id_expide=BigInt(this.id);
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

      this.expideService.updateLivreurs_Expides(this.livreur_expide.id_expide.toString(),this.livreur_expide).subscribe( data =>{
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
}
public AddLivreur() {
  if(this.IFselectedLiv1<20){
    this.getBonLivOfAdd();
    this.IFselectedLiv1=this.IFselectedLiv1+1;
    this.switchMe=!this.switchMe;
  }
}
}
