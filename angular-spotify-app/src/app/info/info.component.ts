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
  text: String = "Data undefined.";

  private httpOptions = { };

  ngOnInit() {
    console.log("Info ngOnInit()");

    // setInterval(() => {
    //   this.dataService.getData().subscribe(data => {
    //   console.log("Subscription event in Info Component!");
    //   this.dataService.song$?.subscribe(song => {
    //     this.song = song;
    //     this.http.get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString.replaceAll(' ', '_')))
    //     .subscribe(
    //       (response) => {
    //         console.log(response);
    //         const contents: string = (response as MyResponse).contents;
    //         this.text = contents;
    //         this.text = this.text.toString().trim();
    //         //console.log(this.text);
    //       }
    //     );
    //   });
    // });
    // }, 1000);

    // this.dataService.getData().subscribe(data => {
    //   console.log("Subscription event in Info Component!");
    //   this.dataService.song$?.subscribe(song => {
    //     this.song = song;
    //     this.http.get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString.replaceAll(' ', '_')))
    //     .subscribe(
    //       (response) => {
    //         console.log(response);
    //         const contents: string = (response as MyResponse).contents;
    //         this.text = contents;
    //         this.text = this.text.toString().trim();
    //         //console.log(this.text);
    //       }
    //     );
    //   });
    // });

    // Subscribe to DataService's song$ Observable
    this.dataService.song$?.subscribe(song => {
      console.log("Subscription event in Info Component!");
      this.text = `Loading data for ${song.artist.artistString}...`;
      this.song = song;
      // If InfoComponent is initialized before any data is received by DataService (e.g. through a page refresh),
        // InfoComponent will have a subscription to DataService's songData and will receive emitted events whenever the song changes
      // If it's initialized afterwards (i.e. by clicking on the Information tab after the page has loaded), it must subscribe again,
        // since it will have subscribed to a version of song$ that will not emit further events
      this.dataService.song$ = this.dataService.getSongData().asObservable();
      this.dataService.song$.subscribe(song => {
          console.log("Subscription event in Info Component!");
          this.text = `Loading data for ${song.artist.artistString}...`;
          this.song = song;
          this.http.get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString.replaceAll(' ', '_')))
          .subscribe(
            (response) => {
              console.log(response);
              const contents: string = (response as MyResponse).contents;
              this.text = contents;
              this.text = this.text.toString().trim();
              //console.log(this.text);
            }
          )});
          this.http.get("https://api.allorigins.win/get?url=" + encodeURIComponent("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString.replaceAll(' ', '_')))
          .subscribe(
            (response) => {
              console.log(response);
              const contents: string = (response as MyResponse).contents;
              this.text = contents;
              this.text = this.text.toString().trim();
              //console.log(this.text);
            }
          );
    });

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

      interface WikiData {
        parse: {
          contents: string;
          title: string;
          images: string[];
        }
      }
      
    //this.http.get("https://en.wikipedia.org/wiki/" + this.song?.artist.artistString)
    // this.http.get("https://crossorigin.me/https://rateyourmusic.com/artist/" + this.song?.artist.artistString.replaceAll(' ', '-'))

  }
}
