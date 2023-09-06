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
    this.artist = "car seat headrest"
    let rep1 = await lastValueFrom(this.http.get<any>('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + this.artist + '&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json'))
    let rep2 = await lastValueFrom(this.http.get<any>('https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + this.artist + '&api_key=9a8a3facebbccaf363bb9fd68fa37abf&format=json'))

    for (let item of rep2.topalbums.album) {
      let titre: String = '';
      let img: String = '';

      titre = item.name;
      img = item.image[2]["#text"];

      this.lstAlbum.push(new Album(titre, img))
    }
  }

  async chargerChanson(nomAlbum: String): Promise<void> {
    //todo changer valeur du display
    // @ts-ignore
    let modal: HTMLElement = document.getElementById("modal-" + nomAlbum)
    // @ts-ignore
    let zoneChanson: Element = modal.children.namedItem("content")
    let Chansons: string = "<h5>" + nomAlbum + "<h5/>";

    if (zoneChanson.innerHTML === "") {
      let cpt: number = 1
      let rep = await lastValueFrom(this.http.get<any>('https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=9a8a3facebbccaf363bb9fd68fa37abf&artist=' + this.artist + '&format=json&album=' + nomAlbum))
      for (let item of rep.album.tracks.track) {
        Chansons += (cpt + ") " + item.name + "<br/>")
        cpt++
      }
      zoneChanson.innerHTML = Chansons;
    }

    if (modal.style.display == "none") {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }

}
