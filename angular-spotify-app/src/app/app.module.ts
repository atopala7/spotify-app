import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { DataComponent } from './data/data.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    DataComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
