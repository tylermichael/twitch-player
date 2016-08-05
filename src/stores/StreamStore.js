/* global Twitch */

import { observable, computed } from 'mobx';

import Stream from '../models/Stream';

class StreamStore {
	@observable followed = [];
	@observable games = [];
	APIService;
	UIStore;

	@computed get favoritedStreams(): Array<Stream> {
		return this.followed.filter((stream: Stream): Boolean => stream.isFavorited)
	}

	constructor(APIService: Object, AuthStore: Object, UIStore: Object) {
		// this.followed = default_streams.streams.map((stream: Object): Stream => new Stream(stream));
		this.APIService = APIService;
		this.AuthStore = AuthStore;
		this.UIStore = UIStore;
		this.getFollowed();
		this.getGames();
    this.UIStore.isDoneLoading = true;
	}

	getFollowed(offset: Number = 0, replace: Boolean = false) {
    let request_params = {
      method: 'streams/followed',
      verb: 'GET',
      params: {
        stream_type: 'all',
        offset: offset * 25
      }
    };
    Twitch.api(request_params, (error: any, result: any): void => {
      if(error) return error;
      if(replace) {
      	this.followed = [];
      }

      result.streams.forEach((stream: Object) => {
	      let _stream = new Stream(stream);
	      _stream.isFavorited = this.UIStore.favoritedStreams.includes(_stream._id);
      	this.followed.push(_stream);
      });
      if(this.followed.length !== result._total) {
      	this.getFollowed(++offset);
      }
    })
	}

	getGames(offset: Number = 0, replace: Boolean = false) {
    let request_params = {
      method: 'games/top',
      verb: 'GET',
      params: {
        stream_type: 'all',
        offset: offset * 25
      }
    };
    Twitch.api(request_params, (error: any, result: any): void => {
      if(error) return error;
      if(replace) {
      	this.games = [];
      }
      result.top.map((game: Object): void => this.games.push(game));
    })
	}
}

export default StreamStore;