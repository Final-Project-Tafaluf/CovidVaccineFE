import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardMainRestService } from 'src/app/Services/rest/dashboard-main-rest.service';
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
import { ScheduleRestService } from 'src/app/Services/rest/schedule-rest.service';
import { ReportRestService } from 'src/app/Services/rest/report-rest.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('Excel') Excel!: ElementRef; 
  selected = 'Monthly';
  constructor(public dashboardMainRestService:DashboardMainRestService, public scheduleRestService: ScheduleRestService,public reportRestService:ReportRestService ,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.dashboardMainRestService.numberOfVaccien();
    this.dashboardMainRestService.numberOfMessage();
    this.dashboardMainRestService.getReport();
    this.dashboardMainRestService.getCenter();
    this.generateMap();
  }

  async generateMap() {
    // debugger;
    var centers = await this.scheduleRestService.getAllCenters();
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

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF("landscape");
      var width = PDF.internal.pageSize.getWidth();
      var height = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, width, height);
      PDF.save('angular-demo.pdf');
    });
  }

  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.Excel.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  }  

}
