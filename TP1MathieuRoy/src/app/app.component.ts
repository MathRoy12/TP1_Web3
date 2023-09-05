import {Component, OnInit} from '@angular/core';
import {Chanson} from './chanson';
import {Album} from "./album";
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  artist: string = '';
  lstAlbum: Album[] = [];
  lstChanson: Chanson[] = [];

  constructor(public http: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    let rep1 = await lastValueFrom(this.http.get<any>('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Megadeth&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json'))
    this.artist = rep1.artist.name
    let rep2 = await lastValueFrom(this.http.get<any>('https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=Megadeth&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json'))

    for (let item of rep2.topalbums.album) {
      let titre: String = '';
      let img: String = '';

      titre = item.name;
      img = item.image[2]["#text"];

      this.lstAlbum.push(new Album(titre, img))
    }
  }



}
