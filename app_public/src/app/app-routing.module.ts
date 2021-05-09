import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors/doctors.component';
import { PoliceComponent } from './police/police.component';
import { SendVaccsComponent } from './send-vaccs/send-vaccs.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', redirectTo: 'doctors' },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'police', component: PoliceComponent },
  { path: 'sendVaccs', component: SendVaccsComponent },
  { path: 'stats', component: StatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
