import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Agency } from "../models/agency";

@Injectable({
    providedIn: "root",
})
export class AgencyService {
    constructor(private apiService: ApiService) {}

    getAllAgencies(): Promise<Agency[]> {
        return this.apiService.getAllAgencies();
    }
}