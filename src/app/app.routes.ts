import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ScheduleComponent } from './views/schedule/schedule.component';
import { TripsComponent } from './views/trips/trips.component';
import { ContactComponent } from './views/contact/contact.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'trips/:routeId', component: TripsComponent},
    {path: '**', redirectTo: 'home'},
];
