import { observable } from 'mobx';

class AuthStore {
	APIService;
	@observable authenticated: boolean;
	constructor() {
		this.authenticated = false;
	}
}

export default new AuthStore();