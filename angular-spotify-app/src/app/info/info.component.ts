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

  title: String = "Undefined";
  pageid: number = 0;
  images: string[] = [];
  content: string = "Undefined.";
  sections: {
      index: string,
      line: string
  }[] = [];

  private httpOptions = { };

  clickInfoSubscription: any;
  clickInfoDataSubscription: any;
  refreshSubscription: any;
  refreshDataSubscription: any;

  ngOnInit() {
    console.log("Info ngOnInit()");

    // Subscribe to DataService's song$ Observable
    this.refreshSubscription = this.dataService.song$?.subscribe(song => {
      console.log("Subscription event in Info Component!");
      this.text = `Loading data for ${song.artist.artistString}...`;
      this.song = song;
      // If InfoComponent is initialized before any data is received by DataService (e.g. through a page refresh),
        // InfoComponent will have a subscription to DataService's songData and will receive emitted events whenever the song changes
      // If it's initialized afterwards (i.e. by clicking on the Information tab after the page has loaded), it must subscribe again,
        // since it will have subscribed to a version of song$ that will not emit further events
      this.dataService.song$ = this.dataService.getSongData().asObservable();
      this.refreshDataSubscription = this.http.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${this.song?.artist.artistString}`)
        .subscribe(response => this.parseWikiData(response));
      this.clickInfoSubscription = this.dataService.song$.subscribe(song => {
          // Unsubscribe from the initial subscription to DataService's song$
          this.refreshSubscription.unsubscribe();
          this.refreshDataSubscription.unsubscribe();
          console.log("Subscription event in Info Component!");
          this.text = `Loading data for ${song.artist.artistString}...`;
          this.song = song;
          this.clickInfoDataSubscription = this.http.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${this.song?.artist.artistString}`)
            .subscribe(response => this.parseWikiData(response))});
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
  }

  ngOnDestroy() {
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
    if (this.refreshDataSubscription) this.refreshDataSubscription.unsubscribe();
    if (this.clickInfoSubscription) this.clickInfoSubscription.unsubscribe();
    if (this.clickInfoDataSubscription) this.clickInfoDataSubscription.unsubscribe();
  }

  parseWikiData(response: Object) : void {
    console.log(response);
    const contents: string = (response as WikiData).parse.title;
    console.log(contents);

    let wiki : WikiData = response as WikiData;
    console.log(wiki.parse);
    this.title = wiki.parse.title;
    this.pageid = wiki.parse.pageid;
    this.images = wiki.parse.images;
    this.content = wiki.parse.text["*"];
    this.content = this.content.replaceAll('a href="/wiki', 'a href="https://wikipedia.org/wiki');
    this.text = `<h1>${this.title}</h1><div>${this.content}</div>`;

    interface WikiData {
      parse: {
        title: string;
        pageid: number;
        images: string[];
        text: {
          "*": string;
        };
        sections: [
          index: string,
          line: string
        ];
      }
    }
  }
}
