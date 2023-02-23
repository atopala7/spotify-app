import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';


import { Song } from '../song'
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  constructor(
    private dataService: DataService) {}

  data: Object | undefined;
  cleanData: String | undefined;
  song: Song | undefined;

  access_token: string | undefined;

  ngOnInit(): void {
    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params);
    //     this.access_token = params['access_token'];
    //     console.log(`access_token: ${this.access_token}`)});

    this.getData();
    //const source = interval(10);
    //setInterval(this.dataService.getData, 1000);
  }

  getData(): void {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
        this.cleanData = this.parse(data);
        this.song = this.extractSong(data);
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
      album: { name: data.item.album.name, art: data.item.album.images[1].url },
      artist: { artists: data.item.artists.map((item: { name: any; }) => item.name), artistString: data.item.artists.map((item: {name: any; }) => item.name).join(", ").toString() },
      name: data.item.name,
      duration: data.item.duration_ms,
      progress: data.progress_ms
    };
    return this.song;
  }
}