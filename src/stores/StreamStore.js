import { observable, computed } from 'mobx';
import TwitchAPI from 'twitch-api-promise';
import _ from 'underscore';

import Stream from '../models/Stream';
import Game from '../models/Game';

class StreamStore {
	@observable followed: Array = [];
	@observable games: Array = [];
	@observable topStreams: Array = [];
	@observable favoriteChannels: Array = [];
	@observable favoriteGames: Array = [];
	UIStore;

	@computed get favoriteStreams(): Array<Stream> {
		return this.followed.filter((stream: Stream): Boolean => stream.favorite)
	}

	constructor(UIStore: Object) {
		this.UIStore = UIStore;
		this.loadFavorites();
		if(TwitchAPI.authenticated) {
			this.getFollowed();
			this.getGames();
			this.getTopStreams();
		}
    this.UIStore.isDoneLoading = true;
	}

	tagFavorited(type: string, favoriteList: Array) {
		this[type].forEach((listing: Object, index: number) =>  {
			if(favoriteList.indexOf(listing._id) > -1) {
				listing.favorite = true;
			} else {
				listing.favorite = false;
			}
		});
	}

	sortByFavorited(type: string, favoriteList: Array) {
		// eslint-disable-next-line
		this[type] = _.sortBy(this[type], item => item.favorite ? 0 : 1, ['asc']);
	}

	favoriteToggle(type: string, id: number) {
		let position;
		switch (type) {
			case 'channel':
				position = this.favoriteChannels.indexOf(id);
				if(position > -1) {
					this.favoriteChannels.splice(position, 1);
				} else {
					this.favoriteChannels.push(id);
				}
				break;
			case 'game':
				position = this.favoriteGames.indexOf(id);
				if(position > -1) {
					this.favoriteGames.splice(position, 1);
				} else {
					this.favoriteGames.push(id);
				}
			break;
			default:
			break;
		}
		this.saveFavorites();
	}

	saveFavorites() {
		if(localStorage !== undefined) {
			localStorage.favoriteChannels = JSON.stringify(this.favoriteChannels);
			localStorage.favoriteGames = JSON.stringify(this.favoriteGames);
		}
	}

	loadFavorites() {
		if(localStorage !== undefined) {
			this.favoriteChannels = JSON.parse(localStorage.favoriteChannels);
			this.favoriteGames = JSON.parse(localStorage.favoriteGames);
		}
	}

	getFollowed(offset: Number = 0, replace: Boolean = false) {
		TwitchAPI.getFollowedStreams()
		.then((result: Object) => {
			this.followed = result.data.streams.map((stream: Object): Stream => {
				return new Stream(stream);
			});
			this.tagFavorited('followed', this.favoriteChannels);
			this.sortByFavorited('followed', this.favoriteChannels);
		})
	}

	getGames(offset: Number = 0, replace: Boolean = false) {
		TwitchAPI.getTopGames()
		.then((result: Object) => {
			this.games = result.data.top.map((game: Object): Game => {
				return new Game(game);
			});
			this.tagFavorited('games', this.favoriteGames);
			this.sortByFavorited('games', this.favoriteGames);
		})
	}

	getTopStreams(offset: Number = 0, replace: Boolean = false) {
		TwitchAPI.getTopStreams()
		.then((result: Object) => {
			this.topStreams = result.data.streams;
		})
	}
}

export default StreamStore;
