import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../models/route";
import { Agency } from "../models/agency";

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

    getStopTimesByTripId(tripId: string): Promise<any[]> {
        return new Promise(resolve => {
            this.httpClient.get(`/api/stop_times/${tripId}`)
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