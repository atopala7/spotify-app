import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Data } from './data';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  private dataUrl = "https://api.spotify.com/v1/me/player/currently-playing";
  
  private httpOptions = {
    headers: new HttpHeaders({ 
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": 'Bearer BQC-2A9l1mb9lJjGx-mmNeB45FSsLRmuwQZm_0Jl6JhVVNAWKAfYKVqMm1EnSKgemm_0zUIaCCuNY958vGYro6i9JA0KQTm-KtkunfDJIgnFYF8z_nSFWR8pZbHUy2q63enmFHu2J2Tei_uQ2gegvXK-KH2--CsimvDxaCKiHSp2jO9gYgWB8flrclJt' 
    })
  };

  getData(): Observable<Object> {
    console.log("getData()");
    return this.http.get<Object>(this.dataUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Object>('getData'))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    }
  }
}
