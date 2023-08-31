import {Chanson} from "./chanson";

export class Album {
  constructor(public name: String,
              public artist: String,
              public lstChanson: Chanson[]) {
  }
}
