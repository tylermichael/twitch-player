import { observable } from 'mobx';

class GameModel {
  @observable _id: Number;
  @observable name: String;
  @observable viewers: Number;
  @observable channels: Number;
  @observable preview: Object;
  @observable favorite: boolean;
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
