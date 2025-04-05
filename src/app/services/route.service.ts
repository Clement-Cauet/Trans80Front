import { Injectable } from "@angular/core";
import { Route } from "../models/route";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root",
})

export class RouteService {

    private routes: Route[] = [];

    constructor(private api: ApiService) {
        this.refreshRoutes();
    }

    refreshRoutes(): void {
        this.api.getAllRoutes().then((routes: any) => this.routes = routes);
    }

    getAllRoutes() {
        return this.routes;
    }
}