import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from 'src/app/Services/helpers.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke'
import Icon from 'ol/style/Icon';
import { Feature, Overlay } from 'ol';
import { Point ,LineString } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { UserProfileRestService } from 'src/app/Services/rest/user-profile-rest.service';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  userRequests:any;
  userData:any;
  userSchedules:any;
  selectedUser:any = {
    "id": 0,
    "first_Name": "",
    "last_Name": "",
    "gender": "",
    "birthdate": "",
    "address": "",
    "phone": "",
    "image": "",
    "email": "",
    "password": "",
    "username": "",
    "ssn": "",
    "dose_Number": 0,
    "role_Id": 0,
    "user_Id": 0
};
  certificateDoseTakenDate:any;
  certificateDose:any;
  certificateCenterName:any;
  certificateVaccineType:any;
  certificateDoctorName:any;
  newDate:Date = new Date();
  takenDoses:any;
  vectorSource:any;
  vectorLayer:any;
  userCoordinates:any;
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('callDeleteDialog') callDeleteDialog! :TemplateRef<any>
  @ViewChild('callMapDialog') callMapDialog! :TemplateRef<any>
  @ViewChild('callCertificateDialog') callCertificateDialog! :TemplateRef<any>
  @ViewChild('callAllCertificatesDialog') callAllCertificatesDialog! :TemplateRef<any>
  constructor(private dialog:MatDialog, public scheduleRestService: ScheduleRestService,private localStorageService: LocalStorageService,public helpersService: HelpersService, public userProfileRestService:UserProfileRestService) { }

  ngOnInit(): void {
    this.getUserDataFromLocal();
    this.getUserRequests();
    this.getUserSchedules();
  }
  getUserDataFromLocal(){
    var token = this.localStorageService.getToken();
    if (token) {
      // debugger;
      this.userData = this.localStorageService.tokenDecode(token);
    }
  }

  async getUserRequests(){
    // debugger;
      this.userRequests = await this.scheduleRestService.getUserRequestById(this.userData.nameid);
  }

  async getUserSchedules(){
    // debugger;
    this.userSchedules = await this.scheduleRestService.getScheduleByUserId(this.userData.nameid);
    // debugger;
    console.log("this.userSchedules",this.userSchedules);
  }

  checkStatus(status:any,toDate:any){
    // debugger;
    if(new Date() >new Date(toDate) && status != 'Taken' ){
      status = 'Absent';
    }
    return status;
  }

  async openCertificateDialog(date:any,dose:any,center_name:any,vaccine_type:any, doctor_name:any){
    this.certificateDoseTakenDate=date;
    this.certificateDose=dose;
    this.certificateCenterName=center_name;
    this.certificateVaccineType=vaccine_type;
    this.certificateDoctorName=doctor_name;

    // debugger;
    this.selectedUser= await this.userProfileRestService.getUserForScheduleByID(this.userData.nameid);
    console.log(this.userProfileRestService.selectedUser)
    const dialogRef=this.dialog.open(this.callCertificateDialog);
    // this.openPDF();
  }

  async openAllCertificatesDialog(){
    // debugger;
    this.selectedUser= await this.userProfileRestService.getUserForScheduleByID(this.userData.nameid);
    this.takenDoses = this.userSchedules.filter((ele:any)=>{return ele.status == "Taken"});
    const dialogRef=this.dialog.open(this.callAllCertificatesDialog);
    // this.openPDF();
  }
  showDetails(center_location:string,center_name:string){
    const dialogRef=this.dialog.open(this.callMapDialog);
    this.generateMap(center_location,center_name);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="no"){
        console.log("Thank you ");
        this.dialog.closeAll();
      }
      }
    })
  }

  openDeleteDialog(id:any){
    const dialogRef=this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res)=>{
      if(res!==undefined)
      {
        if(res=="yes"){
        this.removeRequest(id);
      }
        else if(res=="no")
        console.log("Thank you ");
      }
    })
  }

  removeRequest(requestId: number){
    // debugger;
    this.scheduleRestService.deleteUserRequestById(requestId);
    this.getUserRequests(); // To refresh the table
  }

   public async savePDF(): Promise<void> {
    let DATA: any = document.getElementById('htmlData');
    setTimeout(() => {
      html2canvas(DATA,{ scale: 3 }).then((canvas) => {
        /* let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width; */
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF("landscape");
        var width = PDF.internal.pageSize.getWidth();
        var height = PDF.internal.pageSize.getHeight();
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, width, height);
        PDF.save('angular-demo.pdf');
      });
    }, 500);
   
  }
  async generateMap(center_location:string,center_name:string) {
    //debugger;
    var centerArray = center_location.split(',');
    this.vectorSource = new VectorSource({});
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    this.getUserLocationOnTheMap();
    setTimeout(async()=>{
    var routeCoordinatesArray = await this.scheduleRestService.getRouteCoordinates(this.userCoordinates,[Number(centerArray[0]),Number(centerArray[1])]);
    var routeCoordinatesArray1 =routeCoordinatesArray.routes[0].geometry.coordinates;
    //debugger;
    var routeLayer = new  VectorLayer({
      source: new VectorSource({
          features: [new Feature({ geometry: new LineString((<any>routeCoordinatesArray1), 'XY') })]
      }),
      style: new Style({
          fill: new Fill({ color: '#0091ea' }),
          stroke: new Stroke({ color: '#1abc9c', width: 4 })
      }),
      className: 'routeLayer'
  });

    

    
    var map = new Map({
      view: new View({
        projection: 'EPSG:4326',
        center: [Number(centerArray[0]),Number(centerArray[1])],
        zoom: 8,
        minZoom: 7,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
        routeLayer,
      ],
      target: 'ol-map',
    });
    
        const iconFeature = new Feature({
          geometry: new Point([Number(centerArray[0]),Number(centerArray[1])]),
          name: center_name,
        });
        const iconStyle = new Style({
          image: new Icon({
            // anchor: [0.5, 46],
            // anchorXUnits: 'fraction',
            // anchorYUnits: 'pixels',
            scale:[.4,.4],
            src: '../../../../assets/life_care/images/icon-logo.png',
          }),
        });  
        iconFeature.setStyle(iconStyle);
        this.vectorSource.clear();
        this.vectorSource.addFeatures([iconFeature]);

        const element = document.getElementById('popup') as HTMLElement;

    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    map.addOverlay(popup);

    // display popup on hover
    map.on('pointermove', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        // debugger
        console.log('evt.coordinate',evt.coordinate)
        popup.setPosition([evt.coordinate[0],evt.coordinate[1]+0.05]);
        (<any>$(element)).popover({
          placement: 'top',
          html: true,
          content: feature.get('name'),
        });
        (<any>$(element)).popover('show');
      } else {
        (<any>$(element)).popover('dispose');
      }
      // change mouse cursor when over marker
      // const pixel = map.getEventPixel(evt.originalEvent);
      // const hit = map.hasFeatureAtPixel(pixel);
      // (<any>map.getTarget()).style.cursor = hit ? 'pointer' : '';

    });
    // Close the popup when the map is moved
    map.on('movestart', function () {
      (<any>$(element)).popover('dispose');
    });
  },200)
  }
   getUserLocationOnTheMap(){
    //debugger;
    navigator.geolocation.getCurrentPosition( (position) => {
      //debugger;
      this.userCoordinates=[ position.coords.latitude, position.coords.longitude];
      console.log(position.coords.latitude, position.coords.longitude);
      const iconFeature = new Feature({
        geometry: new Point([position.coords.longitude,position.coords.latitude]),
        name: 'user',
        id:'user',
      });
      const iconStyle = new Style({
        image: new Icon({
          // anchor: [0.5, 160],
          // anchorXUnits: 'fraction',
          // anchorYUnits: 'pixels',
          src: '../../../../assets/icons/person_icon.png',
          scale: [.15, .15],
          
        }),
      });

      iconFeature.setStyle(iconStyle);
      this.vectorSource.addFeatures([iconFeature]);
    });
  }
}
