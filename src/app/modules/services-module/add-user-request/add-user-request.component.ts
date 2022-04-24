import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Feature, Overlay } from 'ol';
import { Point} from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';

@Component({
  selector: 'app-add-user-request',
  templateUrl: './add-user-request.component.html',
  styleUrls: ['./add-user-request.component.scss'],
})
export class AddUserRequestComponent implements OnInit {
  CreateForm: FormGroup = new FormGroup({
    center_id: new FormControl('', [Validators.required]),
    vaccine_id: new FormControl('', [Validators.required]),
    // USER_ID: new FormControl("1",[Validators.required]),
    Request_date: new FormControl('', [Validators.required]),
  });
  map: Map | undefined;
  vectorSource:any;
  constructor(public scheduleRestService: ScheduleRestService) {}

  ngOnInit(): void {
    // debugger;
    this.generateMap();
    this.scheduleRestService.getAllVaccines();
  }

  async generateMap() {
    var centers = await this.scheduleRestService.getAllCenters();
    this.getUserLocationOnTheMap();
    console.log('Data:', centers);


    this.vectorSource = new VectorSource({});
    for (let i = 0; i < centers.length; i++) {
      var coordinates = centers[i].center_Location.split(',');
      const iconFeature = new Feature({
        geometry: new Point([coordinates[0], coordinates[1]]),
        name: centers[i].center_Name,
        id:centers[i].id,
      });
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../../../../assets/life_care/images/icon-logo.png',
          scale: [.4, .4],
        }),
      });

      iconFeature.setStyle(iconStyle);
      this.vectorSource.addFeatures([iconFeature]);
    }

    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });

    var map = new Map({
      view: new View({
        projection: 'EPSG:4326',
        center: [38.2384, 31.5852],
        zoom: 8,
        minZoom: 7,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: 'ol-map',
    });
    const element = document.getElementById('popup') as HTMLElement;

    const popup = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    map.addOverlay(popup);
    // display popup on click
    map.on('click',  (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        this.CreateForm.controls['center_id'].setValue((<any>feature).get('id'));
      } 
    });

    // display popup on hover
    map.on('pointermove', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
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
  }
  
  getUserLocationOnTheMap(){
    debugger;
    navigator.geolocation.getCurrentPosition((position) => {
      debugger;

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

  sendRequest() {}
}
