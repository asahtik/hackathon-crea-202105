import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DoctorService } from "../doctor.service";
import { Vaccination } from "../vaccination"
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

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

  enterVaccID() {
    this.clickedOnEnterVaccID = true;
    this.clickedOnAddNewUser = false;
    this.addNewVaccination = false;
    this.vaccineAdded = false;
  }
  
  enterNewUser() {
    this.clickedOnAddNewUser = true;
    this.clickedOnEnterVaccID = false;
    this.checkedForVaccination = false;
    this.addNewVaccination = false;
    this.vaccineAdded = false;
  }

  confirmNewUser() {
    this.addNewVaccination = true;
  }

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

        this.addNewVaccination = true;

      });
  }

  addVaccination(): void {

    this.newVaccination = {name: this.name, surname: this.surname, emso: this.emso, vaccine: this.vaccineName, tx_prev: this.vaccinationID, date: Math.round(Date.now()/1000)}
    
    this.doctorService.addVaccination(this.newVaccination)
    .subscribe(vaccination => {
      console.log(vaccination);
      this.vaccineAdded = true;
      alert(`Please store this Vaccination ID: ${vaccination.data}`);
    });

    
  }

  ngOnInit(): void {
  }

}
