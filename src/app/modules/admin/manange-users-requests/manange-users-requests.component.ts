import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HelpersService } from 'src/app/Services/helpers.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';
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
  selector: 'app-manange-users-requests',
  templateUrl: './manange-users-requests.component.html',
  styleUrls: ['./manange-users-requests.component.scss'],
})
export class ManangeUsersRequestsComponent implements OnInit {
  @ViewChild('callDeleteDialog') callDeleteDialog!: TemplateRef<any>;
  @ViewChild('callAddScheduleDialog') callAddScheduleDialog!: TemplateRef<any>;
  usersRequests: any;
  CreateForm: FormGroup = new FormGroup({
    start_Time: new FormControl('', [Validators.required]),
    end_Time: new FormControl('', [Validators.required]),
    center_id: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    vaccine_id: new FormControl('', [
      Validators.required,
    ]),
    dose: new FormControl('', [Validators.required]),
    user_Id: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialog: MatDialog,
    public scheduleRestService: ScheduleRestService,
    private localStorageService: LocalStorageService,
    public helpersService: HelpersService
  ) {}

  ngOnInit(): void {
    this.getAllUsersRequests();
  }
  async getAllUsersRequests() {
    // debugger;
    this.usersRequests = await this.scheduleRestService.getUserAllUsersRequests();
  }
  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe((res) => {
      if (res !== undefined) {
        if (res == 'yes') {
          this.removeRequest(id);
        } else if (res == 'no') console.log('Thank you ');
      }
    });
  }

  async OpenAddScheduleDialog(
    center_id: any,
    vaccine_id: any,
    request_date: any,
    user_Id: any
  ) {
    // debugger;
    var checkLastUserTakenDose = await this.scheduleRestService.checkLastUserTakenDose(Number(user_Id));
    // debugger;

    var dose = this.doseGenerator(checkLastUserTakenDose);
    this.CreateForm.controls['start_Time'].setValue(request_date);
    this.CreateForm.controls['end_Time'].setValue(request_date);
    this.CreateForm.controls['status'].setValue('Pending');
    this.CreateForm.controls['dose'].setValue(dose);
    // debugger;
    this.CreateForm.controls['user_Id'].setValue(user_Id);

    const dialogRef = this.dialog.open(this.callAddScheduleDialog, {
      width: '1000px',
      height: '548px',
      position: {
        bottom: '5px',
        right: '30px',
      },
    });

    this.generateMap(center_id,vaccine_id);
  }

  async generateMap(center_id:any, vaccine_id:any) {
    // debugger;
    var centers = await this.scheduleRestService.getAllCenters();
    await this.scheduleRestService.getVaccinesByCenterId(center_id);
    setTimeout(()=>{
      this.CreateForm.controls['center_id'].setValue(center_id);
      this.CreateForm.controls['vaccine_id'].setValue(vaccine_id);
    },200)
    console.log('Data:', centers);
    const vectorSource = new VectorSource({});

    for (let i = 0; i < centers.length; i++) {
      var coordinates = centers[i].center_Location.split(',');
      const iconFeature = new Feature({
        geometry: new Point([coordinates[0], coordinates[1]]),
        name: centers[i].center_Name,
        id: centers[i].id,
      });
      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../../../../assets/life_care/images/icon-logo.png',
          scale:[0.5,0.5],
        }),
      });

      iconFeature.setStyle(iconStyle);
      vectorSource.addFeatures([iconFeature]);
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource,
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
    map.on('click', async (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        await this.scheduleRestService.getVaccinesByCenterId(Number((<any>feature).get('id')));
        this.CreateForm.controls['center_id'].setValue(
          (<any>feature).get('id')
        );
      }
    });

    // display popup on hover
    map.on('pointermove', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      if (feature) {
        console.log('evt.coordinate', evt.coordinate);
        popup.setPosition([evt.coordinate[0], evt.coordinate[1] + 0.05]);
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

  async handleHealthCenterchange() {
    // debugger
    var filterdVaccines = await this.scheduleRestService.getVaccinesByCenterId(
      Number(this.CreateForm.controls['center_id'].value)
    );
    // debugger
    if (filterdVaccines.length > 0) {
      this.CreateForm.controls['vaccine_id'].enable();
    } else {
      this.CreateForm.controls['vaccine_id'].disable();
    }
  }
  doseGenerator(check:string){
    if (check == 'No') {
      return 'First';
    }
    else if (check == 'First') {
      return 'Second';      
    }
    else if (check == 'Second') {
      return '3rd';      
    }
    else if (check == '3rd') {
      return '';      
    }
    else{
      return '';      
    }
  }
  async removeRequest(requestId: number) {
    // debugger;
    this.usersRequests = await this.scheduleRestService.deleteUserRequestById(
      requestId
    );
    // this.getAllUsersRequests(); // To refresh the table
  }
}
