import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService) { }
  title = 'This Song';

  ngOnInit() {
    this.route.queryParams
      .pipe(
        filter(params => params['access_token'])
      )
      .pipe(
        filter(params => params['refresh_token'])
      )
      .subscribe(params => {
        console.log(params);
        this.dataService.setAccessToken(params['access_token']);
        this.dataService.setRefreshToken(params['refresh_token']);
        console.log("access_token: " + this.dataService.access_token);
      }
    );
  }
}
