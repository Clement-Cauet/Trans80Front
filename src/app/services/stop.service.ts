import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Stop } from '../models/stop';

@Injectable({
    providedIn: 'root'
})
export class StopService {
    constructor(private apiService: ApiService) {}

    getAllStops(): Promise<Stop[]> {
        return this.apiService.getAllStops();
    }
}