import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../models/route";
import { Agency } from "../models/agency";
import { Stop } from "../models/stop";
import { StopTime } from "../models/stop_time";

@Injectable({
    providedIn: "root",
})

export class ApiService {

    constructor(private httpClient: HttpClient) { }

    checkPing(): Promise<boolean> {
        return new Promise(resolve => {
            this.httpClient.get("/ping", { responseType: "text" })
                .subscribe({
                    next: (responses: any) => {
                        resolve(responses);
                    },
                    error: () => {
                        resolve(false);
                    }
                });
        });
    }

    getAllAgencies(): Promise<Agency[]> {
        return new Promise(resolve => {
            this.httpClient.get<Agency[]>("/api/agencies")
                .subscribe({
                    next: (response: Agency[]) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    getAllRoutes(): Promise<Route[]> {
        return new Promise(resolve => {
            this.httpClient.get("/api/routes")
                .subscribe({
                    next: (response: any) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    getTripsByRouteId(routeId: string, date: string, directionId: number): Promise<any[]> {
        return new Promise(resolve => {
            this.httpClient.get(`/api/trips/${routeId}?date=${date}&directionId=${directionId}`)
                .subscribe({
                    next: (response: any) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    getStopTimes(tripId?: string, stopId?: string): Promise<StopTime[]> {
        return new Promise(resolve => {
            const params: any = {};
            if (tripId) params.tripId = tripId;
            if (stopId) params.stopId = stopId;

            this.httpClient.get<StopTime[]>(`/api/stop_times`, { params })
                .subscribe({
                    next: (response: StopTime[]) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    getAllStops(): Promise<Stop[]> {
        return new Promise(resolve => {
            this.httpClient.get<Stop[]>("/api/stops")
                .subscribe({
                    next: (response: any) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }
}