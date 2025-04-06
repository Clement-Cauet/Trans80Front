import { Injectable } from "@angular/core";
import { StopTime } from "../models/stop_time";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root",
})
export class StopTimeService {
    constructor(private api: ApiService) { }

    getStopTimesByTripId(tripId: string): Promise<StopTime[]> {
        return this.api.getStopTimesByTripId(tripId);
    }
}