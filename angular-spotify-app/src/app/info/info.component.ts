import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Song } from '../song';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private http: HttpClient
    ) {}

  song: Song | undefined;
  text: String = "Hello";

  private httpOptions = { };

  ngOnInit() {
    this.song = this.dataService.song;

    this.httpOptions = {
      headers: new HttpHeaders({ 
        "X-Requested-With": "null",
        "Content-Type": "text",
      })};

      
      interface MyResponse {
        contents: string;
        status: {
          url: string;
          content_type: string;
          http_code: number;
          response_time: number;
          content_length: number;
        };
      }
      
    //this.http.get("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString)
    // this.http.get("https://crossorigin.me/https://rateyourmusic.com/artist/" + this.song?.artist.artistString.replaceAll(' ', '-'))
    this.http.get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString.replaceAll(' ', '_')))
      .subscribe(
        (response) => {
          console.log(response);
          const contents: string = (response as MyResponse).contents;
          this.text = contents;
          this.text = this.text.toString().trim();
          //console.log(this.text);
        }
      )
  }
}
