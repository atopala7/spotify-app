import { Component } from '@angular/core';

import { Song } from '../song'
import { SongService } from '../song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {
  constructor(private songService: SongService) {}

  song: Song | undefined = undefined;

  // getSong() : void {
  //   this.song = this.songService.getSong();
  // }

  // ngOnInit() : void {
  //   this.getSong();
  // }
}
