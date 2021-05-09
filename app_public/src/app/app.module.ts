import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FormsModule } from '@angular/forms';
import { PoliceComponent } from './police/police.component';
import { SendVaccsComponent } from './send-vaccs/send-vaccs.component';
import { StatsComponent } from './stats/stats.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    PoliceComponent,
    SendVaccsComponent,
    StatsComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
