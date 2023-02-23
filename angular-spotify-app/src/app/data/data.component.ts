import { Component } from '@angular/core';

import { Data } from '../data'
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {
  constructor(private dataService: DataService) {}

  data: Object | undefined = undefined;
  cleanData: String | undefined = undefined;

  getData(): void {
    this.data = this.dataService.getData();
  }

  parseData(): void {
    this.cleanData = JSON.stringify(this.data);
  }

  ngOnInit(): void {
    this.getData();
    this.cleanData = JSON.stringify(this.data);
  }
}