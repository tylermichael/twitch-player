import { observable } from 'mobx';

class StreamModel {
  @observable _id: Number;
  @observable game: String;
  @observable viewers: Number;
  @observable created_at: Date;
  @observable channel: Object;
  @observable preview: Object;
  @observable favorite: Boolean;

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

// {
//   "_id": 22573674304,
//   "game": "Hearthstone: Heroes of Warcraft",
//   "viewers": 6568,
//   "created_at": "2016-07-30T03:01:16Z",
//   "video_height": 1080,
//   "average_fps": 50,
//   "delay": 0,
//   "is_playlist": false,
//   "_links": {
//     "self": "https://api.twitch.tv/kraken/streams/nl_kripp"
//   },
//   "preview": {
//     "small": "https://static-cdn.jtvnw.net/previews-ttv/live_user_nl_kripp-80x45.jpg",
//     "medium": "https://static-cdn.jtvnw.net/previews-ttv/live_user_nl_kripp-320x180.jpg",
//     "large": "https://static-cdn.jtvnw.net/previews-ttv/live_user_nl_kripp-640x360.jpg",
//     "template": "https://static-cdn.jtvnw.net/previews-ttv/live_user_nl_kripp-{width}x{height}.jpg"
//   },
//   "channel": {
//     "mature": false,
//     "status": "TSM Kripp ARENA & Ranked Later! G2A Giveaway = https://gleam.io/mVYgb/kripparrian-july-giveaway (✿☯‿☯✿)(✿☯‿☯✿)",
//     "broadcaster_language": "en",
//     "display_name": "nl_Kripp",
//     "game": "Hearthstone: Heroes of Warcraft",
//     "language": "en",
//     "_id": 29795919,
//     "name": "nl_kripp",
//     "created_at": "2012-04-15T02:25:31Z",
//     "updated_at": "2016-07-30T03:03:32Z",
//     "delay": null,
//     "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/nl_kripp-profile_image-294722d79072f28f-300x300.png",
//     "banner": null,
//     "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/nl_kripp-channel_offline_image-b4f28953b2190755-1920x1080.png",
//     "background": null,
//     "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/nl_kripp-profile_banner-2781fb5fc1393c89-480.png",
//     "profile_banner_background_color": null,
//     "partner": true,
//     "url": "https://www.twitch.tv/nl_kripp",
//     "views": 141331598,
//     "followers": 842569,
//     "_links": {
//       "self": "http://api.twitch.tv/kraken/channels/nl_kripp",
//       "follows": "http://api.twitch.tv/kraken/channels/nl_kripp/follows",
//       "commercial": "http://api.twitch.tv/kraken/channels/nl_kripp/commercial",
//       "stream_key": "http://api.twitch.tv/kraken/channels/nl_kripp/stream_key",
//       "chat": "http://api.twitch.tv/kraken/chat/nl_kripp",
//       "features": "http://api.twitch.tv/kraken/channels/nl_kripp/features",
//       "subscriptions": "http://api.twitch.tv/kraken/channels/nl_kripp/subscriptions",
//       "editors": "http://api.twitch.tv/kraken/channels/nl_kripp/editors",
//       "teams": "http://api.twitch.tv/kraken/channels/nl_kripp/teams",
//       "videos": "http://api.twitch.tv/kraken/channels/nl_kripp/videos"
//     }
//   }
// }
