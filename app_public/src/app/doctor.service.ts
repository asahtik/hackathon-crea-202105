import { Injectable } from '@angular/core';
import { Vaccination } from './vaccination';
import { Data } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorsUrl = 'http://localhost:3000/api/'

  constructor(private http: HttpClient) { }

  addVaccination(vaccination: Vaccination): Observable<any> {

    return this.http.post<Vaccination>(this.doctorsUrl + "add", vaccination)
      .pipe(
        catchError(this.handleError<any>('addVaccination'))
      );
  }


  getStatistics(timestamp: string): Observable<any> {
    return this.http.get<any>(this.doctorsUrl + "/stats/"+timestamp)
      .pipe(
        catchError(this.handleError<any>('checkForVaccination',[]))
      );
  }

  checkForVaccination(vaccinationID: string): Observable<any> {
    return this.http.get<any>(this.doctorsUrl + "get/" + vaccinationID)
      .pipe(
        catchError(this.handleError<any>('checkForVaccination',[]))
      );
  }

  supply(address: string, quantity: number, batchID: string): Observable<any> {
    return this.http.post<any>(this.doctorsUrl + "/supply/", {address: address, quantity: quantity, batch: batchID})
      .pipe(
        catchError(this.handleError<any>('checkForVaccination',[]))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      //this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
