import { observable } from 'mobx';
import Cookies from 'js-cookie';

class UIStore {
  @observable view: String;
  @observable currentChannel: String;
  @observable favoritedStreams: Array;
  @observable isDoneLoading: Boolean;

  currentChannelPlayerURL(): string {
    return this.currentChannel !== '' ?
      `http://player.twitch.tv/?volume=0.38&channel=${this.currentChannel}` :
      '';
  }

  currentChannelChatURL(): string {
    return this.currentChannel !== '' ?
      `http://www.twitch.tv/${this.currentChannel}/chat` :
      '';
  }

  constructor() {
    this.view = 'followed';
    this.currentChannel = '';
    if(!Cookies.get('favoritedStreams')) {
      Cookies.set('favoritedStreams', []);
    }
    this.favoritedStreams = JSON.parse(Cookies.get('favoritedStreams')) || [];
  }
}

export default new UIStore();