import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { DoctorService } from "../doctor.service";
import { ChartType } from "angular-google-charts"

declare let google:any


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  date: string = "";

  total_vaccines: number = 0;
  printData: boolean = false;
  return_data?: Array<Array<any>> = undefined;
  chartTitle = "Distribution of Vaccines"
  typ = ChartType.PieChart

  getStatistics(): void {
    let timestamp = (new Date(this.date).getTime()/1000).toString();

    this.doctorService.getStatistics(timestamp)
    .subscribe(data => {
      console.log(data);
      this.return_data = data.data

      this.showData();



    });
  }

  showData(): void {
    if(this.return_data != null) {

      for(let i = 0; i < this.return_data.length; i++) {
        this.total_vaccines+=this.return_data[i][1];
      }

      this.printData = true;
    }

  }

  ngOnInit(): void {
  }

}
