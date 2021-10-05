import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { delay } from 'rxjs/operators';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'ngx-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.scss']
})
export class UpdateUtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup;
  submitted = false;
  utilisateur: Utilisateur = new Utilisateur();
  id: string;
  nature: any;
  statusessRole:any;
  selectedRole;
  statuses: NbComponentStatus[] = ['primary', 'success', 'info', 'warning', 'danger'  ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
  sizes: NbComponentSize[] = ['tiny', 'small', 'medium', 'large', 'giant'];
  constructor(private authService: TokenStorageService,private toastrService: NbToastrService,private utilisateurService:UtilisateurService,private formBuilder: FormBuilder,public datepipe: DatePipe
    ,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    
    this.utilisateur = new Utilisateur();

    this.id = this.route.snapshot.params['id'];
    
    this.utilisateurService.getUtilisateur(this.id)
      .subscribe(data => {
        this.utilisateur = data;
        this.utilisateur.password = this.utilisateur.showPassword;
        if(this.utilisateur.dateDeNaissance!=null){
        this.utilisateur.dateDeNaissance=new Date(this.utilisateur.dateDeNaissance.toLocaleString());
        this.utilisateur.dateDeNaissance.setMinutes( this.utilisateur.dateDeNaissance.getMinutes() + this.utilisateur.dateDeNaissance.getTimezoneOffset());
        }else{
          this.utilisateur.dateDeNaissance=null;
        }
        if(this.utilisateur.dateRec!=null){
          this.utilisateur.dateRec=new Date(this.utilisateur.dateRec.toLocaleString())
          this.utilisateur.dateRec.setMinutes( this.utilisateur.dateRec.getMinutes() + this.utilisateur.dateRec.getTimezoneOffset());
        }else{
          this.utilisateur.dateRec=null;
        }
        if(this.utilisateur.dateContrat!=null){
          this.utilisateur.dateContrat=new Date(this.utilisateur.dateContrat.toLocaleString())
          this.utilisateur.dateContrat.setMinutes( this.utilisateur.dateContrat.getMinutes() + this.utilisateur.dateContrat.getTimezoneOffset());
        }else{
          this.utilisateur.dateContrat=null;
        }
        if(this.utilisateur.dateDebutConge!=null){
          this.utilisateur.dateDebutConge=new Date(this.utilisateur.dateDebutConge.toLocaleString());
          this.utilisateur.dateDebutConge.setMinutes( this.utilisateur.dateDebutConge.getMinutes() + this.utilisateur.dateDebutConge.getTimezoneOffset());
        }else{
          this.utilisateur.dateDebutConge=null;
        }
        if(this.utilisateur.dateFinConge!=null){
          this.utilisateur.dateFinConge=new Date(this.utilisateur.dateFinConge.toLocaleString());
          this.utilisateur.dateFinConge.setMinutes( this.utilisateur.dateFinConge.getMinutes() + this.utilisateur.dateFinConge.getTimezoneOffset());
        }else{
          this.utilisateur.dateFinConge=null;
        }
        if(this.utilisateur.derMvt!=null){
          this.utilisateur.derMvt=new Date(this.utilisateur.derMvt.toLocaleString());
          this.utilisateur.derMvt.setMinutes( this.utilisateur.derMvt.getMinutes() + this.utilisateur.derMvt.getTimezoneOffset());
        }else{
          this.utilisateur.derMvt=null;
        }
        if(this.utilisateur.datFFac!=null){
          this.utilisateur.datFFac=new Date(this.utilisateur.datFFac.toLocaleString());  
          this.utilisateur.datFFac.setMinutes( this.utilisateur.datFFac.getMinutes() + this.utilisateur.datFFac.getTimezoneOffset()); 
        }else{
          this.utilisateur.datFFac=null;
        }
        if(this.utilisateur.heuresDeTravail!=null){
          this.utilisateur.heuresDeTravail=new Date(this.utilisateur.heuresDeTravail.toLocaleString());
          this.utilisateur.heuresDeTravail.setMinutes( this.utilisateur.heuresDeTravail.getMinutes() + this.utilisateur.heuresDeTravail.getTimezoneOffset()); 
        }else{
          this.utilisateur.heuresDeTravail=new Date('2020-01-01 08:00:00.0');
          this.utilisateur.heuresDeTravail.toLocaleString(); 
        }





        if(this.utilisateur.roles[0].name=="ROLE_ACHETEUR"){
          this.selectedRole="ROLE_ACHETEUR";
        }else if(this.utilisateur.roles[0].name=="ROLE_ADMIN"){
          this.selectedRole="ROLE_ADMIN";
        }else if(this.utilisateur.roles[0].name=="ROLE_AGENT_CAB"){
          this.selectedRole="ROLE_AGENT_CAB";
        }else if(this.utilisateur.roles[0].name=="ROLE_AGENT_SAISIE_REG"){
          this.selectedRole="ROLE_AGENT_SAISIE_REG";
        }else if(this.utilisateur.roles[0].name=="ROLE_CAISSIER"){
          this.selectedRole="ROLE_CAISSIER";
        }else if(this.utilisateur.roles[0].name=="ROLE_CLIENT"){
          this.selectedRole="ROLE_CLIENT";
        }else if(this.utilisateur.roles[0].name=="ROLE_DECIDEUR_BP"){
          this.selectedRole="ROLE_DECIDEUR_BP";
        }else if(this.utilisateur.roles[0].name=="ROLE_EMBALLEUR"){
          this.selectedRole="ROLE_EMBALLEUR";
        }else if(this.utilisateur.roles[0].name=="ROLE_EXPEDITEUR"){
          this.selectedRole="ROLE_EXPEDITEUR";
        }else if(this.utilisateur.roles[0].name=="ROLE_PREPARATEUR"){
          this.selectedRole="ROLE_PREPARATEUR";
        }else if(this.utilisateur.roles[0].name=="ROLE_PREPARATEUR_BR"){
          this.selectedRole="ROLE_PREPARATEUR_BR";
        }else if(this.utilisateur.roles[0].name=="ROLE_RESPONSABLE_DISPATCHING_BP"){
          this.selectedRole="ROLE_RESPONSABLE_DISPATCHING_BP";
        }else if(this.utilisateur.roles[0].name=="ROLE_RESPONSABLE_POINTAGE"){
          this.selectedRole="ROLE_RESPONSABLE_POINTAGE";
        }else if(this.utilisateur.roles[0].name=="ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER"){
          this.selectedRole="ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER";
        }else if(this.utilisateur.roles[0].name=="ROLE_RESPONSABLE_SERVICE_FRS_LOCAL"){
          this.selectedRole="ROLE_RESPONSABLE_SERVICE_FRS_LOCAL";
        }else if(this.utilisateur.roles[0].name=="ROLE_TRANSITAIRE"){
          this.selectedRole="ROLE_TRANSITAIRE";
        }else if(this.utilisateur.roles[0].name=="ROLE_VALIDATEUR_DE_CHARIOT"){
          this.selectedRole="ROLE_VALIDATEUR_DE_CHARIOT";
        }else if(this.utilisateur.roles[0].name=="ROLE_VENDEUR"){
          this.selectedRole="ROLE_VENDEUR";
        }else if(this.utilisateur.roles[0].name=="ROLE_LIVREUR"){
          this.selectedRole="ROLE_LIVREUR";
        }else{
          this.selectedRole="ROLE_USER";
        }

      }, error => console.log(error));

      this.utilisateurService.getRoles().subscribe(data => {
        this.statusessRole = data;
      });
  }

  pass2:boolean = false;
  getpassword(){
      this.pass2 = !this.pass2;
  }
  onSubmitUtilisateur() {
    this.updateUtilisateur();
    this.makeToast(); 
    delay(4000);
    this.utilisateur_list();
  }
  id_modificationRole:Number;
  updateUtilisateur(){ 
    this.id_modificationRole=Number(this.id);

  this.utilisateur.showPassword = this.utilisateur.password;
  console.log(this.utilisateur.showPassword);
  let newDate = new Date(this.datepipe.transform(this.utilisateur.heuresDeTravail, 'HH:MM:SS'));
  try {
    // synchronous operation
    this.utilisateur.heuresDeTravail=newDate;
 }
 catch(error) {
  let latest_date =new Date ('2020-01-01 08:00:00.0');
  this.utilisateur.heuresDeTravail=latest_date;
 }
  const now = Date.now()  
  if(this.utilisateur.dateDeNaissance!=null){
    this.utilisateur.dateDeNaissance.setDate(this.utilisateur.dateDeNaissance.getDate() + 1);
  }else{
    this.utilisateur.dateDeNaissance=null ;
  }
  if(this.utilisateur.dateRec!=null){
    this.utilisateur.dateRec.setDate(this.utilisateur.dateRec.getDate() + 1);
  }else{
    this.utilisateur.dateRec=null ;
  }
  if(this.utilisateur.dateContrat!=null){
    this.utilisateur.dateContrat.setDate(this.utilisateur.dateContrat.getDate() + 1);
  }else{
    this.utilisateur.dateContrat=new Date() ;
  }
  if(this.utilisateur.dateDebutConge!=null){
    this.utilisateur.dateDebutConge.setDate(this.utilisateur.dateDebutConge.getDate() + 1);
  }else{
    this.utilisateur.dateDebutConge=null ;
  }
  if(this.utilisateur.dateFinConge!=null){
    this.utilisateur.dateFinConge.setDate(this.utilisateur.dateFinConge.getDate() + 1);
  }else{
    this.utilisateur.dateFinConge=null ;
  }
  if(this.utilisateur.datFFac!=null){
    this.utilisateur.datFFac.setDate(this.utilisateur.datFFac.getDate() + 1);
  }else{
    this.utilisateur.datFFac=null ;
  }  

  if(this.utilisateur.typeConge==""){
    this.utilisateur.typeConge=null;
  }
  this.utilisateur.derMvt=new Date();

  if(this.utilisateur.typeConge==''){
    this.utilisateur.typeConge="indefini";
  }
  this.utilisateur.connected=0;
  console.log(this.utilisateur);

  if(this.userFile!=null || this.userFile){
  const formData = new FormData();
  const user = this.utilisateur;
  formData.append('user',JSON.stringify(user));
  formData.append('file',this.userFile);
  this.utilisateurService.updateUtilisateur2(this.utilisateur.id.toString(),formData).subscribe( data =>{
    if(this.selectedRole=="ROLE_ACHETEUR"){

      this.utilisateurService.ChangeRoleToACHETEUR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_ADMIN"){
      
      this.utilisateurService.ChangeRoleToADMIN(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_AGENT_CAB"){
      
      this.utilisateurService.ChangeRoleToAGENT_CAB(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_AGENT_SAISIE_REG"){
      
      this.utilisateurService.ChangeRoleToAGENT_SAISIE_REG(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_CAISSIER"){
      
      this.utilisateurService.ChangeRoleToCAISSIER(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_CLIENT"){
      
      this.utilisateurService.ChangeRoleToCLIENT(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_DECIDEUR_BP"){
      
      this.utilisateurService.ChangeRoleToDECIDEUR_BP(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_EMBALLEUR"){
      
      this.utilisateurService.ChangeRoleToEMBALLEUR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_EXPEDITEUR"){
      
      this.utilisateurService.ChangeRoleToEXPEDITEUR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_PREPARATEUR"){
      
      this.utilisateurService.ChangeRoleToPREPARATEUR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_PREPARATEUR_BR"){
      
      this.utilisateurService.ChangeRoleToPREPARATEUR_BR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_RESPONSABLE_DISPATCHING_BP"){
      
      this.utilisateurService.ChangeRoleToRESPONSABLE_DISPATCHING_BP(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_RESPONSABLE_POINTAGE"){
      
      this.utilisateurService.ChangeRoleToRESPONSABLE_POINTAGE(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER"){
      
      this.utilisateurService.ChangeRoleToRESPONSABLE_SERVICE_FRS_ETRANGER(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_RESPONSABLE_SERVICE_FRS_LOCAL"){
     
      this.utilisateurService.ChangeRoleToRESPONSABLE_SERVICE_FRS_LOCAL(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_TRANSITAIRE"){
      
      this.utilisateurService.ChangeRoleToTRANSITAIRE(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_VALIDATEUR_DE_CHARIOT"){
      
      this.utilisateurService.ChangeRoleToVALIDATEUR_DE_CHARIOT(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_VENDEUR"){
      
      this.utilisateurService.ChangeRoleToVENDEUR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else if(this.selectedRole=="ROLE_LIVREUR"){
      
      this.utilisateurService.ChangeRoleToLIVREUR(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }else{
      
      this.utilisateurService.ChangeRoleToUSER(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }
    console.log(data);
  },
  error => console.log(error));
  }else{
    this.utilisateurService.updateUtilisateur(this.id,this.utilisateur).subscribe(data => {
      if(this.selectedRole=="ROLE_ACHETEUR"){

        this.utilisateurService.ChangeRoleToACHETEUR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_ADMIN"){
        
        this.utilisateurService.ChangeRoleToADMIN(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_AGENT_CAB"){
        
        this.utilisateurService.ChangeRoleToAGENT_CAB(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_AGENT_SAISIE_REG"){
        
        this.utilisateurService.ChangeRoleToAGENT_SAISIE_REG(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_CAISSIER"){
        
        this.utilisateurService.ChangeRoleToCAISSIER(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_CLIENT"){
        
        this.utilisateurService.ChangeRoleToCLIENT(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_DECIDEUR_BP"){
        
        this.utilisateurService.ChangeRoleToDECIDEUR_BP(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_EMBALLEUR"){
        
        this.utilisateurService.ChangeRoleToEMBALLEUR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_EXPEDITEUR"){
        
        this.utilisateurService.ChangeRoleToEXPEDITEUR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_PREPARATEUR"){
        
        this.utilisateurService.ChangeRoleToPREPARATEUR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_PREPARATEUR_BR"){
        
        this.utilisateurService.ChangeRoleToPREPARATEUR_BR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_RESPONSABLE_DISPATCHING_BP"){
        
        this.utilisateurService.ChangeRoleToRESPONSABLE_DISPATCHING_BP(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_RESPONSABLE_POINTAGE"){
        
        this.utilisateurService.ChangeRoleToRESPONSABLE_POINTAGE(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER"){
        
        this.utilisateurService.ChangeRoleToRESPONSABLE_SERVICE_FRS_ETRANGER(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_RESPONSABLE_SERVICE_FRS_LOCAL"){
       
        this.utilisateurService.ChangeRoleToRESPONSABLE_SERVICE_FRS_LOCAL(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_TRANSITAIRE"){
        
        this.utilisateurService.ChangeRoleToTRANSITAIRE(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_VALIDATEUR_DE_CHARIOT"){
        
        this.utilisateurService.ChangeRoleToVALIDATEUR_DE_CHARIOT(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_VENDEUR"){
        
        this.utilisateurService.ChangeRoleToVENDEUR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else if(this.selectedRole=="ROLE_LIVREUR"){
        
        this.utilisateurService.ChangeRoleToLIVREUR(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }else{
        
        this.utilisateurService.ChangeRoleToUSER(this.id_modificationRole).subscribe(
          data => {
          },error => console.log('ERROR: ' + error));
    
      }
      this.utilisateur = new Utilisateur();
      console.log(this.utilisateur);
    }, error => console.log(error));
  }
}
  utilisateur_list(){
    this.router.navigate(['//pages/Utilisateurs/utilisateur-list']);
  }
  onReset() {
    this.submitted = false;
    this.utilisateurForm.reset();
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
content = `utilisateur a été modifier!`;

status2: NbComponentStatus = 'danger';

title2 = 'La modification n est pas faite avec succée!';
content2 = `Erreur de modification!`;

status4: NbComponentStatus = 'warning';

title4 = 'Image doit etre de type png,jpg,jpeg!';
content4 = `Fichier de type eronée!`;

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



/**get random value in coduser */
getRandomNumber() {
  let random = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
  this.utilisateur.codUser=random;
}

/** */




/**upload image user */
userFile;
imgURL: any;
public imagePath;
onSelectFile(event){
if(event.target.files.length > 0){
  const file =event.target.files[0];
  this.userFile =file;

  var mimeType = event.target.files[0].type;
  console.log(this.utilisateur.fileName);
  if(mimeType.match(/image\/jpeg/) === null && mimeType.match(/image\/png/) === null){
    this.makeToast4();
  }else{

    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}


}


/** end upload image user */
}
