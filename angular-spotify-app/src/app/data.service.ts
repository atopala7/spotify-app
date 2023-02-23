import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Data } from './data';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  private dataUrl = "https://api.spotify.com/v1/me/player/currently-playing";
  public access_token : string | undefined = undefined;
  private refresh_token : string | undefined;
  
  private httpOptions = { };

  setAccessToken(access_token: string) {
    this.access_token = access_token;
    this.httpOptions = {
      headers: new HttpHeaders({ 
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.access_token}` 
      })};
  }

  setRefreshToken(refresh_token: string) {
    this.refresh_token = refresh_token;
  }

  getData(): Observable<Object> {
    console.log("access_token: " + this.access_token);
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
