import { observable } from 'mobx';

class StreamModel {
  @observable _id: Number;
  @observable game: String;
  @observable viewers: Number;
  @observable created_at: Date;
  @observable channel: Object;
  @observable preview: Object;
  @observable favorite: boolean;
  constructor(stream: Object) {
    this._id = stream._id;
    this.game = stream.game;
    this.created_at = stream.created_at;
    this.preview = stream.preview;
    this.channel = stream.channel;
    this.viewers = stream.viewers;
    this.favorite = false;
  }
  favoriteToggle() {
    this.favorite = !this.favorite;
  }
}

export default StreamModel;