import { HttpClient, HttpParams } from "@angular/common/http";
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

    getAllRoutes(params?: { routeId?: string; stopId?: string }): Promise<Route[]> {
        return new Promise(resolve => {
            let httpParams = new HttpParams();
            if (params?.routeId) {
                httpParams = httpParams.set('routeId', params.routeId);
            }
            if (params?.stopId) {
                httpParams = httpParams.set('stopId', params.stopId);
            }

            this.httpClient.get<Route[]>("/api/routes", { params: httpParams })
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

    getStopTimes(params?: {tripId?: string, routeId?: string, stopId?: string, date?: string, directionId?: string}): Promise<StopTime[]> {
        return new Promise(resolve => {
            let httpParams = new HttpParams();
            if (params?.tripId) {
                httpParams = httpParams.set('tripId', params.tripId);
            }
            if (params?.routeId) {
                httpParams = httpParams.set('routeId', params.routeId);
            }
            if (params?.stopId) {
                httpParams = httpParams.set('stopId', params.stopId);
            }
            if (params?.date) {
                httpParams = httpParams.set('date', params.date);
            }
            if (params?.directionId) {
                httpParams = httpParams.set('directionId', params.directionId);
            }
        
            this.httpClient.get<StopTime[]>(`/api/stop_times`, { params: httpParams })
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