import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageHealthCenterRestService } from 'src/app/Services/rest/manage-health-center-rest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateHealthCenterComponent } from '../create-health-center/create-health-center.component';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Feature, Overlay } from 'ol';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
@Component({
  selector: 'app-manage-health-center',
  templateUrl: './manage-health-center.component.html',
  styleUrls: ['./manage-health-center.component.scss']
})
export class ManageHealthCenterComponent implements OnInit {

  @ViewChild('callUpdateDailog') callUpdateDailog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog! :TemplateRef<any>
  vectorSource:any;
  vectorLayer:any;
  constructor(private dialog:MatDialog, public manageHealthCenterRestService:ManageHealthCenterRestService) { }
  center:any={};
  ngOnInit(): void {
    this.manageHealthCenterRestService.getAll();
  }

  create()
  {
    this.dialog.open(CreateHealthCenterComponent);
  }
 
  

  openUpdateDailog(id1 :any,
    center_Name1 :any,center_Phone1:any,center_Location1:any){
     console.log(id1,center_Name1);
     this.center={
       id:id1,
       center_Name:center_Name1,
       center_Phone:center_Phone1,
       center_Location:center_Location1,
     }
     console.log(this.center);
     this.UpdateForm.controls['id'].setValue(this.center.id)
     this.dialog.open(this.callUpdateDailog);
     this.generateUpdateMap(center_Location1);
   }

   UpdateForm:FormGroup=new FormGroup({
     id:new FormControl(),
     center_Name: new FormControl('', [Validators.required]),
    center_Phone:new FormControl('', [Validators.required]),
    center_Location:new FormControl('', [Validators.required]),
  })

  update(){
    this.manageHealthCenterRestService.updateHeathCenter(this.UpdateForm.value);
    this.dialog.closeAll();
  }

  openDeleteDailog(id:number)
  {
      const dialogRef=this.dialog.open(this.callDeleteDailog);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined)
        {
          if(result=='yes')
          this.manageHealthCenterRestService.deleteItem(id);
          else if(result=='no'){
            console.log("Thank you ");
            this.dialog.closeAll();
          }
        }
      }) 
  }
  async generateUpdateMap(center_Location:any) {
    // debugger;
    this.vectorSource = new VectorSource({});
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });
    var old_coordinates = center_Location.split(',');
    var map = new Map({
      view: new View({
        projection: 'EPSG:4326',
        center: [Number(old_coordinates[0]), Number(old_coordinates[1])],
        zoom: 8,
        minZoom: 7,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      target: 'ol-edit-map',
    });
   

    const iconFeature = new Feature({
      geometry: new Point([Number(old_coordinates[0]), Number(old_coordinates[1])]),

    });
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '../../../../assets/life_care/images/icon-logo.png',
      }),
    });
    iconFeature.setStyle(iconStyle);
    this.vectorSource.clear();
    this.vectorSource.addFeatures([iconFeature]);

    map.on('click',  (evt) => {
      // debugger
        var coordinates = evt.coordinate;
        const iconFeature = new Feature({
          geometry: new Point([coordinates[0], coordinates[1]]),

        });
        const iconStyle = new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '../../../../assets/life_care/images/icon-logo.png',
          }),
        });
        this.UpdateForm.controls['center_Location'].setValue(`${coordinates[0]},${coordinates[1]}`);

        iconFeature.setStyle(iconStyle);
        this.vectorSource.clear();
        this.vectorSource.addFeatures([iconFeature]);
      
    });
    
  }

 
  changeIconLocation(){
    var old_coordinates = this.UpdateForm.controls['center_Location'].value.split(',');

    const iconFeature = new Feature({
      geometry: new Point([Number(old_coordinates[0]), Number(old_coordinates[1])]),

    });
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '../../../../assets/life_care/images/icon-logo.png',
      }),
    });
    iconFeature.setStyle(iconStyle);
    this.vectorSource.clear();
    this.vectorSource.addFeatures([iconFeature]);
  }
}
