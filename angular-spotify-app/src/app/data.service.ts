import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Data } from './data';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  private dataUrl = "https://api.spotify.com/v1/me/player/currently-playing";

  getData(): Observable<Object> {
    return this.http.get<Object>(this.dataUrl);
  }
}
