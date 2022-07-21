import { Component } from './component.js';
export class UserCard extends Component {

	constructor(options) {
		super(options);
		this.options = options;
		this.user;
		this.userUrl = options.userUrl;
	}

	async createUserCard() {
		const url = this.userUrl;
		const selector = this.options.userClass
		const userTemplate = await this.getTemplate(url, selector);
		const user = await userTemplate.cloneNode(true);
		this.user = user;

		return await this.user;
	}
}
