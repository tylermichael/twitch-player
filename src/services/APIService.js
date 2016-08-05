/* @flow */
/* global Twitch */

class APIService {

	AuthStore: Object;

	init() {
		Twitch.init({clientId: 'myoyjhg8x5nsqj9l4u9sokugzapftg3'}, (error: any, status: Object): void => {
			if(error) return console.error(error);
			this.AuthStore.authenticated = status.authenticated;
		})
	}
}

export default new APIService();