import { observable } from 'mobx';

class GameModel {
  @observable _id: Number;
  @observable name: String;
  @observable viewers: Number;
  @observable channels: Number;
  @observable preview: Object;
  @observable favorite: Boolean;

  constructor(gameListing: Object) {
  	this._id = gameListing.game._id;
  	this.name = gameListing.game.name;
  	this.preview = gameListing.game.box.template;
    this.viewers = gameListing.viewers;
  	this.channels = gameListing.channels;
    this.favorite = false;
  }

  favoriteToggle() {
    this.favorite = !this.favorite;
  }
}

export default GameModel;

// {
//   "game":  {
//     "name": "League of Legends",
//     "popularity": 65718,
//     "_id": 21779,
//     "giantbomb_id": 24024,
//     "box": {
//       "large": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-272x380.jpg",
//       "medium": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-136x190.jpg",
//       "small": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-52x72.jpg",
//       "template": "https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-{width}x{height}.jpg"
//     },
//     "logo": {
//       "large": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-240x144.jpg",
//       "medium": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-120x72.jpg",
//       "small": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-60x36.jpg",
//       "template": "https://static-cdn.jtvnw.net/ttv-logoart/League%20of%20Legends-{width}x{height}.jpg"
//     },
//     "_links": {}
//   },
//   "viewers": 61606,
//   "channels": 1545
// }
