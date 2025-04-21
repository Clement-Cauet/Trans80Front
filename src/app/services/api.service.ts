import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../models/route";
import { Agency } from "../models/agency";
import { Stop } from "../models/stop";
import { StopTime } from "../models/stop_time";
import { UserHistory } from "../models/user_history";
import { AuthService } from "./auth.service";
import { UserFavorite } from "../models/user_favorite";
import { Shape } from "../models/shape";

@Injectable({
    providedIn: "root",
})

export class ApiService {

    constructor(private httpClient: HttpClient, private authService: AuthService) { }

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

    private getAuthHeaders(): { [header: string]: string } {
        const token = this.authService.getAccessToken();
        return { Authorization: `Bearer ${token}` };
    }

    getUserHistory(): Promise<UserHistory[]> {
        return new Promise(resolve => {
            const headers = this.getAuthHeaders();
            this.httpClient.get<UserHistory[]>("/api/user_history", { headers })
                .subscribe({
                    next: (response: UserHistory[]) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    addUserHistory(userHistory: UserHistory): Promise<UserHistory> {
        return new Promise(resolve => {
            const headers = this.getAuthHeaders();
            this.httpClient.post<UserHistory>("/api/user_history", userHistory, { headers })
                .subscribe({
                    next: (response: UserHistory) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve(new UserHistory({}));
                    }
                });
        });
    }

    getUserFavorites(): Promise<UserFavorite[]> {
        return new Promise(resolve => {
            const headers = this.getAuthHeaders();
            this.httpClient.get<UserFavorite[]>("/api/user_favorite", { headers })
                .subscribe({
                    next: (response: UserFavorite[]) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    addUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
        return new Promise(resolve => {
            const headers = this.getAuthHeaders();
            this.httpClient.post<UserFavorite>("/api/user_favorite", userFavorite, { headers })
                .subscribe({
                    next: (response: UserFavorite) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve(new UserFavorite({}));
                    }
                });
        });
    }

    deleteUserFavorite(userFavorite: UserFavorite): Promise<UserFavorite> {
        return new Promise(resolve => {
            const headers = this.getAuthHeaders();
            this.httpClient.delete<UserFavorite>(`/api/user_favorite/${userFavorite.id}`, { headers })
                .subscribe({
                    next: (response: UserFavorite) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve(new UserFavorite({}));
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

    getAllTrips(routeId?: string, date?: string, directionId?: number): Promise<any[]> {
        return new Promise(resolve => {
            let httpParams = new HttpParams();
            if (routeId) {
                httpParams = httpParams.set('routeId', routeId);
            }
            if (date) {
                httpParams = httpParams.set('date', date);
            }
            if (directionId !== undefined) {
                httpParams = httpParams.set('directionId', directionId.toString());
            }

            this.httpClient.get<any[]>('/api/trips', { params: httpParams })
                .subscribe({
                    next: (response: any[]) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }

    getTripById(tripId: string): Promise<any> {
        return new Promise(resolve => {
            this.httpClient.get<any>(`/api/trips/${tripId}`)
                .subscribe({
                    next: (response: any) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve(null);
                    }
                });
        });
    }

    getStopTimes(params?: { tripId?: string, routeId?: string, stopId?: string, date?: string, directionId?: string }): Promise<StopTime[]> {
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

    getShapes(params ?: { shapeId?: string }): Promise<Shape[]> {
        return new Promise(resolve => {
            let httpParams = new HttpParams();
            if (params?.shapeId) {
                httpParams = httpParams.set('shapeId', params.shapeId);
            }

            this.httpClient.get<any[]>("/api/shapes", { params: httpParams })
                .subscribe({
                    next: (response: any[]) => {
                        resolve(response);
                    },
                    error: () => {
                        resolve([]);
                    }
                });
        });
    }
}