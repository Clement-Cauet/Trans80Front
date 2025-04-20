import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  private map: any;
  private defaultLocation: { lat: number, lng: number } = { lat: 49.900002, lng: 2.3 };

  constructor() { }

  private initMap(lat: number, lng: number): void {
    this.map = L.map('map', {
      center: [lat, lng],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([lat, lng]).addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.getUserLocation();
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`User location: ${latitude}, ${longitude}`);
          this.initMap(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.initMap(this.defaultLocation.lat, this.defaultLocation.lng);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.initMap(this.defaultLocation.lat, this.defaultLocation.lng);
    }
  }
}
