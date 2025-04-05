import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Route } from "../models/route";

@Injectable({
    providedIn: "root",
})

export class ApiService {

    constructor(private httpClient: HttpClient) { }

    checkPing(): Promise<boolean> {
        return new Promise(resolve => {
            this.httpClient.get("/api/ping", { responseType: "text" })
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
}