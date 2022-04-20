import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MatDialog } from '@angular/material/dialog';
import { ManageHealthCenterRestService } from 'src/app/Services/rest/manage-health-center-rest.service';

@Component({
  selector: 'app-create-health-center',
  templateUrl: './create-health-center.component.html',
  styleUrls: ['./create-health-center.component.scss']
})
export class CreateHealthCenterComponent implements OnInit {
  CreateForm:FormGroup=new FormGroup({
    center_Name: new FormControl('', [Validators.required]),
    center_Phone:new FormControl('', [Validators.required]),
    center_Location:new FormControl('', [Validators.required]),
  })
  vectorSource:any;
  vectorLayer:any;
constructor(private dialog:MatDialog, public manageHealthCenterRestService:ManageHealthCenterRestService) { }

ngOnInit(): void {
  this.generateCreateMap()
}
save(){
  debugger;
  this.manageHealthCenterRestService.createHelthCenter(this.CreateForm.value);
  this.dialog.closeAll();
}

async generateCreateMap() {
  debugger;
  this.vectorSource = new VectorSource({});
  this.vectorLayer = new VectorLayer({
    source: this.vectorSource,
  });
  var map = new Map({
    view: new View({
      projection: 'EPSG:4326',
      center: [36.784,31.3851],
      zoom: 8,
      minZoom: 7,
    }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      this.vectorLayer,
    ],
    target: 'ol-create-map',
  });
 
  map.on('click',  (evt) => {
    debugger
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
      this.CreateForm.controls['center_Location'].setValue(`${coordinates[0]},${coordinates[1]}`);

      iconFeature.setStyle(iconStyle);
      this.vectorSource.clear();
      this.vectorSource.addFeatures([iconFeature]);
    
  });
  
}

changeIconLocation(){
  var old_coordinates = this.CreateForm.controls['center_Location'].value.split(',');

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
