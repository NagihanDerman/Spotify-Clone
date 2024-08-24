import { renderSearchMusic, renderSongs } from "./ui.js";
//  api key
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9e13f939c6mshec3979ba5839793p1cd636jsnf537eb604fd2",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
//*popüler müzikler icin api key
const optionsTop = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9e13f939c6mshec3979ba5839793p1cd636jsnf537eb604fd2",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  constructor() {
    this.song = [];
  }

  // apiden cevabı getirir.
  async searchMusic(query) {
    try {
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${query}=&locale=tr-TR&limit=5`,
        options
      );
      const data = await res.json();
      let newData = data.tracks.hits;
      newData = newData.map((song) => ({ ...song.track }));
      this.songs = newData;
      //apiden gelen cevabi ekrana yazdirma
      renderSearchMusic(this.songs);
    } catch (err) {
      console.log(err);
    }
  }

  async topPopular() {
    const url =
      "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";

    try {
      // fetch isteği
      const response = await fetch(url, optionsTop);
      //json'a çevirme
      const result = await response.json();
      //song dizisine gelen cevaı aktarma
      this.songs = result.tracks;
      renderSongs(this.songs);
    } catch (error) {
      console.log(error);
    }
  }
}
