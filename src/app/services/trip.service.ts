import { Injectable } from "@angular/core";
import { Trip } from "../models/trip";
import { ApiService } from "./api.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})

export class TripService {

    private trips$ = new BehaviorSubject<Trip[]>([]);

    constructor(private api: ApiService) { }

    init(routeId: string, date: string, directionId: number): void {
        this.refreshTrips(routeId, date, directionId);
    }

    refreshTrips(routeId: string, date: string, directionId: number): void {
        this.api.getTripsByRouteId(routeId, date, directionId).then((trips: Trip[]) => {
            this.trips$.next(trips);
        });
    }

    getTrips() {
        return this.trips$.asObservable();
    }
}