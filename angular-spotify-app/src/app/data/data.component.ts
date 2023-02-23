import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { interval, filter } from 'rxjs';


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
    private route: ActivatedRoute) {}

  data: Object | undefined;
  cleanData: String | undefined;
  song: Song | undefined;

  access_token: string | undefined;

  ngOnInit(): void {
    this.getData();

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