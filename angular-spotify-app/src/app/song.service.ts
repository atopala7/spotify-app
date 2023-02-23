import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private http: HttpClient
  ) { }

  private tokenUrl = "localhost:8888";
  private songUrl = "https://api.spotify.com/v1/me/player/currently-playing";

  song: Song = {
    id: 1,
    name: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile"
  }

  // getSong(): Observable<Song> {
  //   return this.http.get<Song>
  // }
}
