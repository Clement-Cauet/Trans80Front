import { Trip } from './trip';
import { Stop } from './stop';

export class StopTime {
    id!: number;
    trip!: Trip;
    stop!: Stop;
    arrivalTime!: number;
    departureTime!: number;
    timepoint!: number;
    stopSequence!: number;
    stopHeadsign?: string;
    routeShortName?: string;
    pickupType?: number;
    dropOffType?: number;
    shapeDistTraveled?: number;
    proxy?: {
        trip: Trip;
        shapeDistTraveledSet: boolean;
        departureTime: number;
        timepointSet: boolean;
        timepoint: number;
        stopHeadsign: string;
        routeShortName: string;
        pickupType: number;
        dropOffType: number;
        shapeDistTraveled: number;
        stop: Stop;
        arrivalTime: number;
        stopSequence: number;
        arrivalTimeSet: boolean;
        departureTimeSet: boolean;
        id: number;
    };
    shapeDistTraveledSet?: boolean;
    timepointSet?: boolean;
    arrivalTimeSet?: boolean;
    departureTimeSet?: boolean;

    constructor(data: Partial<StopTime>) {
        Object.assign(this, data);
    }
}