import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbDateService, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService, NbWindowService } from '@nebular/theme';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Role } from '../Role/role';
import { Utilisateur } from '../utilisateur';
import { UtilisateurService } from '../utilisateur.service';
import * as moment from "moment";
import { Console } from 'console';
@Component({
  selector: 'ngx-create-utilisateur',
  templateUrl: './create-utilisateur.component.html',
  styleUrls: ['./create-utilisateur.component.scss']
})
export class CreateUtilisateurComponent implements OnInit {

  /** teamplate Ajouter */
  starRate = 2;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  statusessRole:any;
  utilisateurForm: FormGroup;
  selectedRole;
  
/** ********************* */

utilisateur: Utilisateur = new Utilisateur();
submitted = false;
constructor(private authService: TokenStorageService,private utilisateurService: UtilisateurService,
    private router: Router,private formBuilder: FormBuilder,public datepipe: DatePipe,private toastrService: NbToastrService,
    protected dateService: NbDateService<Date>,private windowService: NbWindowService) { }
ngOnInit() {
  this.utilisateur.typeConge='';
  this.utilisateur.typeContrat='';
  this.utilisateur.comptant=false;
  this.utilisateur.bl=false;
  this.getRandomNumber();
  this.utilisateur.heuresDeTravail= new Date(this.datepipe.transform(this.utilisateur.heuresDeTravail, '08:00'))


    this.utilisateur.dateRec= new Date(Date().toLocaleString());
    this.utilisateur.dateRec.setMinutes( this.utilisateur.dateRec.getMinutes() + this.utilisateur.dateRec.getTimezoneOffset());

    this.utilisateur.dateContrat= new Date(Date().toLocaleString());
    this.utilisateur.dateContrat.setMinutes( this.utilisateur.dateContrat.getMinutes() + this.utilisateur.dateContrat.getTimezoneOffset());

    this.utilisateur.dateDebutConge= new Date(Date().toLocaleString());
    this.utilisateur.dateDebutConge.setMinutes( this.utilisateur.dateDebutConge.getMinutes() + this.utilisateur.dateDebutConge.getTimezoneOffset());

    this.utilisateur.dateFinConge= new Date(Date().toLocaleString());
    this.utilisateur.dateFinConge.setMinutes( this.utilisateur.dateFinConge.getMinutes() + this.utilisateur.dateFinConge.getTimezoneOffset());

    this.utilisateur.derMvt= new Date(Date().toLocaleString());
    this.utilisateur.derMvt.setMinutes( this.utilisateur.derMvt.getMinutes() + this.utilisateur.derMvt.getTimezoneOffset());

    this.utilisateur.datFFac= new Date(Date().toLocaleString());
    this.utilisateur.datFFac.setMinutes( this.utilisateur.datFFac.getMinutes() + this.utilisateur.datFFac.getTimezoneOffset());


  this.utilisateurService.getRoles().subscribe(data => {
    this.statusessRole = data;
    console.log(data);
  });
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  id_modificationRole:number;
  async save() {
  
  if(this.selectedRole=="ROLE_ACHETEUR"){
    this.utilisateur.role=['acheteur'];
  }else if(this.selectedRole=="ROLE_ADMIN"){
    this.utilisateur.role=['admin'];
  }else if(this.selectedRole=="ROLE_AGENT_CAB"){
    this.utilisateur.role=['agent_cab'];
  }else if(this.selectedRole=="ROLE_AGENT_SAISIE_REG"){
    this.utilisateur.role=['agent_saisie_reg'];
  }else if(this.selectedRole=="ROLE_CAISSIER"){
    this.utilisateur.role=['caissier'];
  }else if(this.selectedRole=="ROLE_CLIENT"){
    this.utilisateur.role=['client'];
  }else if(this.selectedRole=="ROLE_DECIDEUR_BP"){
    this.utilisateur.role=['decideur_bp'];
  }else if(this.selectedRole=="ROLE_EMBALLEUR"){
    this.utilisateur.role=['emballeur'];
  }else if(this.selectedRole=="ROLE_EXPEDITEUR"){
    this.utilisateur.role=['expediteur'];
  }else if(this.selectedRole=="ROLE_PREPARATEUR"){
    this.utilisateur.role=['preparateur'];
  }else if(this.selectedRole=="ROLE_PREPARATEUR_BR"){
    this.utilisateur.role=['preparateur_br'];
  }else if(this.selectedRole=="ROLE_RESPONSABLE_DISPATCHING_BP"){
    this.utilisateur.role=['responsable_dispatching_bp'];
  }else if(this.selectedRole=="ROLE_RESPONSABLE_POINTAGE"){
    this.utilisateur.role=['responsable_pointage'];
  }else if(this.selectedRole=="ROLE_RESPONSABLE_SERVICE_FRS_ETRANGER"){
    this.utilisateur.role=['responsable_service_frs_etranger'];
  }else if(this.selectedRole=="ROLE_RESPONSABLE_SERVICE_FRS_LOCAL"){
    this.utilisateur.role=['responsable_service_frs_local'];
  }else if(this.selectedRole=="ROLE_TRANSITAIRE"){
    this.utilisateur.role=['transitaire'];
  }else if(this.selectedRole=="ROLE_VALIDATEUR_DE_CHARIOT"){
    this.utilisateur.role=['validateur_de_chariot'];
  }else if(this.selectedRole=="ROLE_VENDEUR"){
    this.utilisateur.role=['vendeur'];
  }else if(this.selectedRole=="ROLE_LIVREUR"){
    this.utilisateur.role=['livreur'];
  }else{
    this.utilisateur.role=['user'];
  }

  let newDate = new Date(this.datepipe.transform(this.utilisateur.heuresDeTravail, 'HH:mm'));
  if(newDate!=null){
    this.utilisateur.heuresDeTravail=newDate;
  }else{
    newDate = new Date(this.datepipe.transform(this.utilisateur.heuresDeTravail, '08:00'));
    this.utilisateur.heuresDeTravail=newDate;
  }
  const now = Date.now()  
  if(this.utilisateur.dateDeNaissance!=null){
    this.utilisateur.dateDeNaissance.setDate(this.utilisateur.dateDeNaissance.getDate() + 1);
  }else{
    this.utilisateur.dateDeNaissance=new Date();
  }
  if(this.utilisateur.dateRec!=null){
    this.utilisateur.dateRec.setDate(this.utilisateur.dateRec.getDate() + 1);
  }else{
    this.utilisateur.dateRec=null;
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
  if(this.utilisateur.derMvt!=null){
    this.utilisateur.derMvt.setDate(this.utilisateur.derMvt.getDate() + 1);
  }else{
    this.utilisateur.derMvt=new Date();
  }
  if(this.utilisateur.datFFac!=null){
    this.utilisateur.datFFac.setDate(this.utilisateur.datFFac.getDate() + 1);
  }else{
    this.utilisateur.datFFac=null;
  }  

  if(this.utilisateur.typeConge=='')
  {
    this.utilisateur.typeConge="indefini";
  }
  this.utilisateur.connected=0;
  console.log(this.utilisateur);




  if(this.userFile!=null || this.userFile){
  const formData = new FormData();
  const user = this.utilisateur;
  formData.append('user',JSON.stringify(user));
  formData.append('file',this.userFile);
  await this.utilisateurService.createUtilisateur2(formData).subscribe( data =>{
    console.log(data);
  },error => console.log(error));
  await this.delay(3000);
  console.log(this.selectedRole);

  this.utilisateurService.getLastIdUser().subscribe( data =>{
    this.id_modificationRole=Number(data.toString()).valueOf();
    console.log(this.id_modificationRole);


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
          console.log(data)
        },error => console.log('ERROR: ' + error));

    }else{
      
      this.utilisateurService.ChangeRoleToUSER(this.id_modificationRole).subscribe(
        data => {
        },error => console.log('ERROR: ' + error));
  
    }
  },error => console.log(error));
  }else{
        this.utilisateurService.createUtilisateur(this.utilisateur)
          .subscribe(data =>{ 
            console.log(data)
      }, error => console.log(error));
    }
  }
  onSubmitUtilisateur() {
    this.submitted = true;
    this.save(); 
    this.makeToast();
    this.gotoListUtilisateur();  
  }

  gotoListUtilisateur($myParam: string = ''): void {
    const navigationDetails: string[] = ['//pages/Utilisateurs/utilisateur-list'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

  pass2:boolean = false;
  getpassword(){
    this.pass2 = !this.pass2;
}
  /** test verification des input */

onReset() {
  this.submitted = false;
  this.utilisateurForm.reset();
} 
/** end test verification des input*/


/**toaster show start */
config: NbToastrConfig;

index = 1;
destroyByClick = true;
duration = 2000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
preventDuplicates = false;

status: NbComponentStatus = 'success';

title = 'L addition faite avec succée!';
content = `L\'utilisateur est ajouter!`;

status2: NbComponentStatus = 'danger';

title2 = 'L\'addition n est pas faite avec succée!';
content2 = `Erreur de saisir!`;

status3: NbComponentStatus = 'warning';

title3 = 'Image doit etre de type png,jpg,jpeg!';
content3 = `Fichier de type eronée!`;

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
makeToast3() {
  this.showToast(this.status3, this.title3, this.content3);
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



/**upload image user */
userFile;
imgURL: any;
public imagePath;
onSelectFile(event){
if(event.target.files.length > 0){
  const file =event.target.files[0];
  this.userFile =file;

  var mimeType = event.target.files[0].type;
  console.log(mimeType);
  console.log(mimeType.match(/image\/jpeg/) === null);
  console.log(mimeType.match(/image\/png/)===null)
  if(mimeType.match(/image\/jpeg/) === null && mimeType.match(/image\/png/) === null){
    this.makeToast3();
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


/**get random value in coduser */
getRandomNumber() {
  let random = Math.floor(Math.random() * (9999999 - 1000000)) + 1000000;
  this.utilisateur.codUser=random;
}

/** */

}
