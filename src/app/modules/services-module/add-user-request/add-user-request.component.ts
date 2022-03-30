import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

@Component({
  selector: 'app-add-user-request',
  templateUrl: './add-user-request.component.html',
  styleUrls: ['./add-user-request.component.scss']
})
export class AddUserRequestComponent implements OnInit {
  CreateForm:FormGroup=new FormGroup({
    HEALTH_CENTER: new FormControl("",[Validators.required]),
    VACCINE_TYPE: new FormControl("",[Validators.required]),
    USER_ID: new FormControl("1",[Validators.required]),
    REQUEST_DATE:new FormControl("",[Validators.required]),
  })
  map: Map | undefined;
  constructor() { }

  ngOnInit(): void {

    const vectorSource = new VectorSource({
    });
    for (let i = 0; i < 10; i++) {
      const iconFeature = new Feature({
        geometry: new Point([39.2384+i,31.5852+i]),
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
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
      vectorSource.addFeatures([iconFeature])
    }

    

    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    
    

    this.map = new Map({
      view: new View({
        projection: 'EPSG:4326',
        center: [39.2384,31.5852 ],
        zoom: 7,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),vectorLayer
      ],
      target: 'ol-map'
    });

  }

  sendRequest(){

  }
}
