import { Injectable } from "@angular/core";
import { Route } from "../models/route";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root",
})

export class RouteService {
    constructor(private apiService: ApiService) {}

    getAllRoutes(): Promise<Route[]> {
        return this.apiService.getAllRoutes();
    }
}