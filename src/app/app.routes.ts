import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TripsComponent } from './components/trips/trips.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'trips/:routeId', component: TripsComponent},
    {path: '**', redirectTo: 'home'},
];
