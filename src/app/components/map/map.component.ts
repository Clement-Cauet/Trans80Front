import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Shape } from '../../models/shape';
import { Stop } from '../../models/stop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  imports: [],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  @Input() shapes: Shape[] = [];
  @Input() stops: Stop[] = [];

  private map: any;
  private defaultLocation: { lat: number, lng: number } = { lat: 49.900002, lng: 2.3 };

  constructor(private router: Router) { }

  private initMap(lat: number, lng: number): void {
    if (!this.map) {
      this.map = L.map('map', {
        center: [lat, lng],
        zoom: 13
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    } else {
      this.map.setView([lat, lng], 13);
    }
  }

  ngAfterViewInit(): void {
    this.initMap(this.defaultLocation.lat, this.defaultLocation.lng);
    if (this.router.url === '/home') {
      this.getUserLocation();
    } else {
      this.plotShapes();
      this.plotStops();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shapes'] && this.map) {
      this.plotShapes();
    }
    if (changes['stops'] && this.map) {
      this.plotStops();
    }
  }

  private plotShapes(): void {
    if (this.map && this.shapes.length > 0) {
      const latLngs = this.shapes.map(shape => [shape.lat, shape.lon] as [number, number]);
      const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(polyline.getBounds());
    }
  }

  private plotStops(): void {
    if (this.map && this.stops.length > 0) {
      this.stops.forEach(stop => {
        L.marker([stop.lat, stop.lon])
          .addTo(this.map)
          .bindPopup(`<b>${stop.name}</b>`);
      });
    }
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 13);
          L.marker([latitude, longitude]).addTo(this.map);
        },
        (error) => {
          console.error('Geolocation error:', error);
          this.map.setView([this.defaultLocation.lat, this.defaultLocation.lng], 13);
          L.marker([this.defaultLocation.lat, this.defaultLocation.lng]).addTo(this.map);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
