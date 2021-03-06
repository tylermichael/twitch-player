import { observable } from 'mobx';

class UIStore {
  @observable view: String;
  @observable currentChannel: String;
  @observable favoritedStreams: Array;
  @observable isDoneLoading: Boolean;
  @observable secondaryContent: String;
  @observable topGameSearchTerm: String;
  @observable searchIsDoneLoading: Boolean = true;

  constructor() {
    this.view = 'followed';
    this.currentChannel = '';
  }

  currentChannelPlayerURL(): string {
    return this.currentChannel !== '' ?
      `https://player.twitch.tv/?volume=0.38&channel=${this.currentChannel}` :
      '';
  }

  currentChannelChatURL(): string {
    return this.currentChannel !== '' ?
      `https://www.twitch.tv/${this.currentChannel}/chat` :
      '';
  }
}

export default new UIStore();
