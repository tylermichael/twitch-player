// import Cookie from 'js-cookie';
import { observable } from 'mobx';

class AuthStore {
	APIService;
	@observable authenticated;

	constructor() {
		this.authenticated = false;
	}
}

export default new AuthStore();