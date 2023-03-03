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
      console.log("We have an access token (presumably from session data).");
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
    console.log("Data Component's getData()");
    this.dataService.getData().subscribe(data => {
      console.log("Subscription event in Data Component!");
      this.dataService.song$?.subscribe(song => {
        this.song = song;
        console.log("Data Component's song: " + JSON.stringify(this.song));
      });
    });
  }
}