import { Component, OnInit } from '@angular/core';
import { Inject, Injectable } from '@angular/core';
import { DoctorService } from "../doctor.service";
import { Vaccination } from "../vaccination"
 
@Component({
  selector: 'app-send-vaccs',
  templateUrl: './send-vaccs.component.html',
  styleUrls: ['./send-vaccs.component.css']
})
export class SendVaccsComponent implements OnInit {

  address: string = "";
  quantity: number = 0;
  batchID: string = "";
  supplied: boolean = false;


  constructor(private doctorService: DoctorService) { }

  supply(): void {
    this.doctorService.supply(this.address, this.quantity, this.batchID)
    .subscribe(supply => {
      console.log(supply);
      this.supplied = true;

    });
  }


  ngOnInit(): void {
  }

}
