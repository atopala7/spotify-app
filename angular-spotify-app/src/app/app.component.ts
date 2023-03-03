import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }
  title = 'This Song';

  ngOnInit() {
    console.log("AppComponent ngOnInit()");
    let accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      console.log("accessToken: " + accessToken);
      this.dataService.setAccessToken(accessToken);
    }

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
        this.router.navigate(
          [''], 
          { relativeTo: this.route, queryParams: { } }
          // { relativeTo: this.route, queryParams: { 'access_token': this.dataService.access_token, 'refresh_token': this.dataService.refresh_token } }
        );
      }
    );
  }
}
