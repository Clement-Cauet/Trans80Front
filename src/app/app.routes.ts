import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ScheduleComponent } from './views/schedule/schedule.component';
import { TripsComponent } from './views/trips/trips.component';
import { ContactComponent } from './views/contact/contact.component';
import { ProfileComponent } from './views/profile/profile.component';
import { StopComponent } from './views/stop/stop.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'trips/:routeId', component: TripsComponent},
    {path: 'stop/:stopId', component: StopComponent},
    {path: '**', redirectTo: 'home'},
];
