import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa: any
  constructor() { }

  ngOnInit(): void {
    this.mapa = L.map('posicionMapa').setView([39.50632113472658, -2.8759418428275954], 14)
    const trozos = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    })
    trozos.addTo(this.mapa)
    L.marker([39.50632113472658, -2.8759418428275954]).addTo(this.mapa)
  }

}
 