import { Injectable } from "@angular/core";
import { Shape } from "../models/shape";
import { ApiService } from "./api.service";

@Injectable({
    providedIn: "root",
})
export class ShapeService {
    constructor(private apiService: ApiService) { }

    getShapes(params?: { shapeId?: string }): Promise<Shape[]> {
        return this.apiService.getShapes(params);
    }
}