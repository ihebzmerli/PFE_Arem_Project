import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbComponentStatus, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';
import { MessageService } from 'primeng/api';
import { TokenStorageService } from '../../auth/token-storage.service';
import { PagesComponent } from '../../pages.component';
import { Fournis } from '../fournis';
import { FournisService } from '../fournis.service';
@Component({
  selector: 'ngx-fournis-detail',
  templateUrl: './fournis-detail.component.html',
  styleUrls: ['./fournis-detail.component.scss'],
  providers: [MessageService]
})
export class FournisDetailComponent implements OnInit {
  
  options: any;

  overlays: any[];

  dialogVisible: boolean;

  markerTitle: string;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean;


  fourniss: Fournis;
  codFrs: string;
  fournis: Fournis;

  lat1:string;
  lat2:string;
  lat3:string;
  lat4:string;
  lat5:string;
  lat6:string;

  lng1:string;
  lng2:string;
  lng3:string;
  lng4:string;
  lng5:string;
  lng6:string;

  label1:string;
  label2:string;
  label3:string;
  label4:string;
  label5:string;
  label6:string;
  constructor(private authService: TokenStorageService,private messageService: MessageService,private toastrService: NbToastrService, private fournisService: FournisService , private router : Router,private _Activatedroute :ActivatedRoute) {}

  ngOnInit() {
    
        this.fournis = new Fournis();

        this.codFrs = this._Activatedroute.snapshot.params['codFrs'];

        this.fournisService.getFournis(this.codFrs).subscribe(data => {
        this.fourniss = data;
        console.log(data)
        this.controlleGoogleMap();
        this.initOverlays();
        });
      this.options = {
          center: {lat: 34.607416520301236, lng: 9.434091065915501},
          zoom: 4
      };


      this.infoWindow = new google.maps.InfoWindow();
    }

  controlleGoogleMap(){


    /**
     * the latGoogleMap , the lngGoogleMap ant the labelGoogleMap they are a string in the database that in form of a list 
     * the add will be spesific for the admin so the , is the difference between value1 and value2 the $  and without is 
     * the difference between the corporate location and not  
     */
    
          /** for lat google map */
    if(this.fourniss.latGoogleMap!==null){
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=1){
            this.lat1 = this.fourniss.latGoogleMap.substring(0,this.fourniss.latGoogleMap.indexOf(','));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=2){
            this.lat2 = this.fourniss.latGoogleMap.substring(this.lat1.length+1,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+2));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=3){
            this.lat3 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+1+this.lat2.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=4){
            this.lat4 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=5){
            this.lat5 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=6){
            this.lat6 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1+this.lat5.length+1,this.fourniss.latGoogleMap.length-1);
        }
        
        console.log(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length);
        console.log(this.lat1);
        console.log(this.lat2);
        console.log(this.lat3);
        console.log(this.lat4);
        console.log(this.lat5);
        console.log(this.lat6);
    }
    /** for lng google map */
    if(this.fourniss.lngGoogleMap!==null){
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=1){
            this.lng1 = this.fourniss.lngGoogleMap.substring(0,this.fourniss.lngGoogleMap.indexOf(','));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=2){
            this.lng2 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+2));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=3){
            this.lng3 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+1+this.lng2.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=4){
            this.lng4 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1+this.lng3.length+1,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+1+this.lng2.length+1+this.lng3.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=5){
            this.lng5 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1+this.lng3.length+1+this.lng4.length+1,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+1+this.lng2.length+1+this.lng3.length+1+this.lng4.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=6){
            this.lng6 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1+this.lng3.length+1+this.lng4.length+1+this.lng5.length+1,this.fourniss.lngGoogleMap.length-1);
        }
        console.log(this.lng1);
        console.log(this.lng2);
        console.log(this.lng3);
        console.log(this.lng4);
        console.log(this.lng5);
        console.log(this.lng6);
    }
    /** for label google map */
    if(this.fourniss.labelGoogleMap!==null){
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=1){
            this.label1 = this.fourniss.labelGoogleMap.substring(0,this.fourniss.labelGoogleMap.indexOf(','));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=2){
            this.label2 = this.fourniss.labelGoogleMap.substring(this.label1.length+1,this.fourniss.labelGoogleMap.indexOf(',',this.label1.length+2));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=3){
            this.label3 = this.fourniss.labelGoogleMap.substring(this.label1.length+1+this.label2.length+1,this.fourniss.labelGoogleMap.indexOf(',',this.label1.length+1+this.label2.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=4){
            this.label4 = this.fourniss.labelGoogleMap.substring(this.label1.length+1+this.label2.length+1+this.label3.length+1,this.fourniss.labelGoogleMap.indexOf(',',this.label1.length+1+this.label2.length+1+this.label3.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=5){
            this.label5 = this.fourniss.labelGoogleMap.substring(this.label1.length+1+this.label2.length+1+this.label3.length+1+this.label4.length+1,this.fourniss.labelGoogleMap.indexOf(',',this.label1.length+1+this.label2.length+1+this.label3.length+1+this.label4.length+1));
        }
        if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length>=6){
            this.label6 = this.fourniss.labelGoogleMap.substring(this.label1.length+1+this.label2.length+1+this.label3.length+1+this.label4.length+1+this.label5.length+1,this.fourniss.labelGoogleMap.length-1);
        }
        console.log(this.label1);
        console.log(this.label2);
        console.log(this.label3);
        console.log(this.label4);
        console.log(this.label5);
        console.log(this.label6);
        }
    }

  handleMapClick(event) {
      this.dialogVisible = true;
      this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event) {
      let isMarker = event.overlay.getTitle != undefined;

      if (isMarker) {
          let title = event.overlay.getTitle();
          this.infoWindow.setContent('' + title + '');
          this.infoWindow.open(event.map, event.overlay);
          event.map.setCenter(event.overlay.getPosition());

          this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
      }
      else {
          this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
      }
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async addMarker() {
    if((this.fourniss.latGoogleMap==null || this.fourniss.lngGoogleMap==null || this.fourniss.labelGoogleMap==null) || (this.fourniss.latGoogleMap.replace(/[^,]/g, "").length<6 || this.fourniss.lngGoogleMap.replace(/[^,]/g, "").length<6 || this.fourniss.labelGoogleMap.replace(/[^,]/g, "").length<6)){
        this.fournis = new Fournis();
        this.fournis.latGoogleMap = this.selectedPosition.lat().toString();
        this.fournis.lngGoogleMap = this.selectedPosition.lng().toString();
        this.fournis.labelGoogleMap = this.markerTitle.toString();
        this.fournisService.updateFournis(this.codFrs,this.fournis).subscribe(async data => {
          console.log(data);
          await this.makeToast();
          await this.delay(2000);
          window.location.reload();
        }, error => console.log(error));
        this.markerTitle = null;
      } else if(this.fourniss.latGoogleMap.replace(/[^,]/g, "").length==6 || this.fourniss.lngGoogleMap.replace(/[^,]/g, "").length==6 || this.fourniss.labelGoogleMap.replace(/[^,]/g, "").length==6){
        this.makeToast2();
    }
  }

  handleDragEnd(event) {
      this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  }

  initOverlays() {

      if (!this.overlays||!this.overlays.length) {
          if((this.lat1 && this.lng1) || (this.lat2 && this.lng2) || (this.lat3 && this.lng3) || (this.lat4 && this.lng4) || (this.lat5 && this.lng5) || (this.lat6 && this.lng6)){
            if((!this.lat1.includes('$') && !this.lng1.includes('$')) || (!this.lat2.includes('$') && !this.lng2.includes('$')) || (!this.lat3.includes('$') && !this.lng3.includes('$')) || (!this.lat4.includes('$') && !this.lng4.includes('$')) || (!this.lat5.includes('$') && !this.lng5.includes('$')) || (!this.lat6.includes('$') && !this.lng6.includes('$'))){
            this.overlays = [
                new google.maps.Marker({position: {lat: parseFloat(this.lat1), lng: parseFloat(this.lng1)}, title:this.label1}),
                new google.maps.Marker({position: {lat: parseFloat(this.lat2), lng: parseFloat(this.lng2)}, title:this.label2}),
                new google.maps.Marker({position: {lat: parseFloat(this.lat3), lng: parseFloat(this.lng3)}, title:this.label3}),
                new google.maps.Marker({position: {lat: parseFloat(this.lat4), lng: parseFloat(this.lng4)}, title:this.label4}),
                new google.maps.Marker({position: {lat: parseFloat(this.lat5), lng: parseFloat(this.lng5)}, title:this.label5}),
                new google.maps.Marker({position: {lat: parseFloat(this.lat6), lng: parseFloat(this.lng6)}, title:this.label6}),
                /*
                new google.maps.Polygon({paths: [
                    {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
                    ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
                    }),
                new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
                */
            ];
            }
            if(this.lng1 && this.lat1 && (this.lat1.includes('$') || this.lng1.includes('$'))){
                this.lat1 = this.fourniss.latGoogleMap.substring(1,this.fourniss.latGoogleMap.indexOf(','));
                this.lng1 = this.fourniss.lngGoogleMap.substring(1,this.fourniss.lngGoogleMap.indexOf(','));
                console.log(this.lat1);
                console.log(this.lng1);
                let val1Circle = new google.maps.Circle({center: {lat: parseFloat(this.lat1), lng: parseFloat(this.lng1)}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 9000})
                this.overlays.push(val1Circle);
            }
            if(this.lng2 && this.lat2 && (this.lat2.includes('$')  || this.lng2.includes('$'))){
                this.lat2 = this.fourniss.latGoogleMap.substring(this.lat1.length+2,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+2));
                this.lng2 = this.fourniss.lngGoogleMap.substring(this.lng1.length+2,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+2));
                console.log(this.lat2);
                console.log(this.lng2);
                let val2Circle = new google.maps.Circle({center: {lat: parseFloat(this.lat2), lng: parseFloat(this.lng2)}, fillColor: '#1976D2', fillOpacity: 0.5, strokeWeight: 1, radius: 9000})
                this.overlays.push(val2Circle);
            }
            if(this.lng3 && this.lat3 && (this.lat3.includes('$')  || this.lng3.includes('$'))){
                this.lat3 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+2,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+1+this.lat2.length+1));
                this.lng3 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+2,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+1+this.lng2.length+1));
                console.log(this.lat3);
                console.log(this.lng3);
                let val3Circle = new google.maps.Circle({center: {lat: parseFloat(this.lat3), lng: parseFloat(this.lng3)}, fillColor: '#1976D2', fillOpacity: 0.5, strokeWeight: 1, radius: 9000})
                this.overlays.push(val3Circle);
            }
            if(this.lng4 && this.lat4 && (this.lat4.includes('$')  || this.lng4.includes('$'))){
                this.lat4 = this.lat4 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+2,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1));
                this.lng4 = this.lng4 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1+this.lng3.length+2,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+1+this.lng2.length+1+this.lng3.length+1));
                console.log(this.lat4);
                console.log(this.lng4);
                let val4Circle = new google.maps.Circle({center: {lat: parseFloat(this.lat4), lng: parseFloat(this.lng4)}, fillColor: '#1976D2', fillOpacity: 0.5, strokeWeight: 1, radius: 9000})
                this.overlays.push(val4Circle);
            }
            if(this.lng5 && this.lat5 && (this.lat5.includes('$')  || this.lng5.includes('$'))){
                this.lat5 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+2,this.fourniss.latGoogleMap.indexOf(',',this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1));
                this.lng5 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1+this.lng3.length+1+this.lng4.length+2,this.fourniss.lngGoogleMap.indexOf(',',this.lng1.length+1+this.lng2.length+1+this.lng3.length+1+this.lng4.length+1));
                console.log(this.lat5);
                console.log(this.lng5);
                let val5Circle = new google.maps.Circle({center: {lat: parseFloat(this.lat5), lng: parseFloat(this.lng5)}, fillColor: '#1976D2', fillOpacity: 0.5, strokeWeight: 1, radius: 9000})
                this.overlays.push(val5Circle);
            }
            if(this.lng6 && this.lat6 && (this.lat6.includes('$')  || this.lng6.includes('$'))){
                this.lat6 = this.fourniss.latGoogleMap.substring(this.lat1.length+1+this.lat2.length+1+this.lat3.length+1+this.lat4.length+1+this.lat5.length+2,this.fourniss.latGoogleMap.length-1);
                this.lng6 = this.fourniss.lngGoogleMap.substring(this.lng1.length+1+this.lng2.length+1+this.lng3.length+1+this.lng4.length+1+this.lng5.length+2,this.fourniss.lngGoogleMap.length-1);
                console.log(this.lat6);
                console.log(this.lng6);
                let val6Circle = new google.maps.Circle({center: {lat: parseFloat(this.lat6), lng: parseFloat(this.lng6)}, fillColor: '#1976D2', fillOpacity: 0.5, strokeWeight: 1, radius: 9000})
                this.overlays.push(val6Circle);
            }
        }
      }
      console.log(this.overlays);
  }

  zoomIn(map) {
      map.setZoom(map.getZoom()+1);
  }

  zoomOut(map) {
      map.setZoom(map.getZoom()-1);
  }

  clear() {
      this.overlays = [];
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
    
        title = 'Ajout fournisseur!';
        content = `Localisation sauvgarder!`;
    
        status2: NbComponentStatus = 'danger';
    
        title2 = 'Ajout non fait!';
        content2 = `Localisation non sauvgarder!`;
    
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
}

