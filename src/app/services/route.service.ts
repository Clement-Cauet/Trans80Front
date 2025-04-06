import { Injectable } from "@angular/core";
import { Route } from "../models/route";
import { ApiService } from "./api.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})

export class RouteService {

    private routes$ = new BehaviorSubject<Route[]>([]);

    constructor(private api: ApiService) {
        this.refreshRoutes();
    }

    refreshRoutes(): void {
        this.api.getAllRoutes().then((routes) => this.routes$.next(routes));
    }

    getAllRoutes() {
        return this.routes$.asObservable();
    }
}