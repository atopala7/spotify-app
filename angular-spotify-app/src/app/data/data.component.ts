import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { interval, filter } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Song } from '../song'
import { DataService } from '../data.service';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) {}

  data: Object | undefined;
  cleanData: String | undefined;
  song: Song | undefined;

  ngOnInit(): void {
    console.log("DataComponent ngOnInit()");

    // Get session data if it exists; this sets the access and refresh tokens if they've been previously determined
    this.dataService.getSessionData();
    
    if (this.dataService.access_token) {
      this.getData();
    }

    // If query parameters exist for the tokens, overwrite session data
    this.route.queryParams
    .pipe(
      filter(params => params['access_token'])
    )
    .pipe(
      filter(params => params['refresh_token'])
    )
    .subscribe(params => {
        this.dataService.setAccessToken(params['access_token']);
        this.dataService.setRefreshToken(params['refresh_token']);
        console.log("--------------------QUERY PARAMETERS---------------------------");
        console.log(params);
        console.log("access_token: " + this.dataService.access_token);
        console.log("---------------------------------------------------------------");
      
        // Get the initial data; this occurs when the page is reached with query parameters
        this.getData();

        // Get rid of the parameters in the URL
        this.router.navigate(
          [''], 
          { relativeTo: this.route, queryParams: { } }
          // { relativeTo: this.route, queryParams: { 'access_token': this.dataService.access_token, 'refresh_token': this.dataService.refresh_token } }
        );
      }
    );
  }

  getData(): void {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
        this.cleanData = this.parse(data);
        this.song = this.extractSong(data);
        this.dataService.song = this.song;
        console.log(this.data);
        console.log(this.song);
      });
  }

  parse(data: Object): String {
    return JSON.stringify(data);
  }

  extractSong(data: any) : Song {
    this.song = {
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
    return this.song;
  }
}