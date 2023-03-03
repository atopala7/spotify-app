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
  }
}
