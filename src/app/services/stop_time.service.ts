import { Injectable } from "@angular/core";
import { StopTime } from "../models/stop_time";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root",
})
export class StopTimeService {
    constructor(private apiService: ApiService) { }

    getStopTimes(tripId?: string, stopId?: string): Promise<StopTime[]> {
        return this.apiService.getStopTimes(tripId, stopId);
    }
}