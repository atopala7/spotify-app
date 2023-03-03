import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Data } from './data';
import { AppComponent } from './app.component';
import { Song } from './song';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient
  ) { 
    console.log("DataService CONSTRUCTOR");
  }

  private dataUrl = "https://api.spotify.com/v1/me/player/currently-playing";
  public access_token : string | undefined | null = undefined;
  public refresh_token : string | undefined | null = undefined;
  
  private httpOptions = { };

  getSessionData() {
    let accessToken = sessionStorage.getItem('access_token');
    let refreshToken = sessionStorage.getItem('refresh_token');
    if (accessToken) {
      console.log("Session access_token: " + accessToken);
      this.setAccessToken(accessToken);
    }
    if (refreshToken) {
      console.log("Session access_token: " + refreshToken);
      this.setRefreshToken(refreshToken);
    }
  }

  setAccessToken(access_token: string) {
    console.log("Setting access_token...");
    this.access_token = access_token
    sessionStorage.setItem("access_token", this.access_token);
    this.updateHttpHeaders();
  }

  setRefreshToken(refresh_token: string) {
    console.log("Setting refresh_token...");
    this.refresh_token = refresh_token;
    sessionStorage.setItem("refresh_token", this.refresh_token);
  }

  updateHttpHeaders() {
    if (this.access_token) {
      this.httpOptions = {
        headers: new HttpHeaders({ 
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.access_token}`})};
    }
  }

  // Get the raw data from Spotify, setting the access token from session data in the process
  getSpotifyData(): Observable<Object> {
    console.log("Data Service's getSpotifyData()");
    if (!this.access_token) {
      if (sessionStorage.getItem("access_token")) {
        this.access_token = sessionStorage.getItem("access_token");
      }
    }

    return this.http.get<Object>(this.dataUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Object>('getData'))
      );
  }

  // getData(): Observable<Object> {
  //   console.log("Data Service's getData()");
  //   return this.getSpotifyData()
  //     .pipe(map(data => {
  //       console.log("Data: " + JSON.stringify(data));
  //       // this.cleanData = this.parse(data);
  //       //console.log("Clean Data: " + JSON.stringify(this.cleanData));
  //       this.song$ = this.extractSong(data);
  //       this.song$.subscribe(song => {
  //         console.log("Back in Data Service's getData()");
  //         console.log("Song: " + JSON.stringify(song));
  //       });
  //       return data;
  //     }));
  // }

  parse(data: Object): String {
    return JSON.stringify(data);
  }

  getSong() : Observable<Song> {
    console.log("Extracting song...");
    //console.log("Data is " + JSON.stringify(data));
    return this.getSpotifyData()
      .pipe(map(spotifyData => {
        let data = spotifyData as any;
        let song = {
          id: data.item.id,
          album: { 
            name: data.item.album.name, 
            art: data.item.album.images[1].url 
          },
          artist: { 
            artists: data.item.artists.map((item: { name: any; }) => item.name), 
            artistString: data.item.artists.map((item: {name: any; }) => item.name).join(", ").toString() 
          },
          name: data.item.name,
          duration: data.item.duration_ms,
          progress: data.progress_ms
        };
        console.log("In getSong() - song is " + JSON.stringify(song));
        return song;
      }));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error("An error has occured!");
      // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    }
  }
}
