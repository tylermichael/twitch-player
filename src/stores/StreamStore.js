import { observable, computed } from 'mobx';
import TwitchAPI from 'twitch-api-promise';

import Stream from '../models/Stream';

class StreamStore {
	@observable followed = [];
	@observable games = [];
	@observable topStreams = [];
	APIService;
	UIStore;

	@computed get favoritedStreams(): Array<Stream> {
		return this.followed.filter((stream: Stream): Boolean => stream.isFavorited)
	}

	constructor(UIStore: Object) {
		// this.followed = default_streams.streams.map((stream: Object): Stream => new Stream(stream));
		this.UIStore = UIStore;
		if(TwitchAPI.authenticated) {
			this.getFollowed();
			this.getGames();
			this.getTopStreams();
		}
    this.UIStore.isDoneLoading = true;
	}

	getFollowed(offset: Number = 0, replace: Boolean = false) {
		TwitchAPI.getFollowedStreams()
		.then(result => {
			this.followed = result.data.streams;
		})
	}

	getGames(offset: Number = 0, replace: Boolean = false) {
		TwitchAPI.getTopGames()
		.then(result => {
			this.games = result.data.top;
		})
	}

	getTopStreams(offset: Number = 0, replace: Boolean = false) {
		TwitchAPI.getTopStreams()
		.then(result => {
			this.topStreams = result.data.streams;
		})
	}
}

export default StreamStore;
