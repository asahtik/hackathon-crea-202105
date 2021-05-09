import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DoctorService } from "../doctor.service";
import { Vaccination } from "../vaccination"
@Component({
  selector: 'app-police',
  templateUrl: './police.component.html',
  styleUrls: ['./police.component.css']
})
export class PoliceComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  vaccinationID: string = "";
  lastVaccinations: Vaccination[] = [];
  lastVaccination?: Vaccination;
  newVaccination?: Vaccination;
  vaccineName: string = "";
  vaccineAdded: boolean = false;
  checkedForVaccination: boolean = false;
  wasNotVaccinated: boolean = false;
  showWarning: boolean = false;
  clickedOnEnterVaccID: boolean = false;
  clickedOnAddNewUser: boolean = false;
  addNewVaccination: boolean = false;
  vaccines: string[] = [];
  dates: number[] = [];
  name: string = "";
  surname: string = "";
  emso: string = "";

  


  checkForVaccination(vaccinationID: string):void {

    this.doctorService.checkForVaccination(vaccinationID)
      .subscribe(d => {
        var data = d.data;
        console.log(data);
        this.vaccines = data.vaccines;
        this.dates = data.dates;
        this.name = data.name;
        this.surname = data.surname;
        this.emso = data.emso;
        this.checkedForVaccination = true;

      });
  }
  ngOnInit(): void {
  }

}
