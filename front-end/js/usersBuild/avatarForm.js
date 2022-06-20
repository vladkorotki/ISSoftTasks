import { Component } from './component.js';
export class AvatarForm extends Component {

	constructor(options) {
		super(options);
		this.options = options;
		this.form;
		this.formUrl = options.formUrl;
		this.selector = options.selector;
	}

	async createFormAvatar() {
		const url = this.formUrl;
		const selector = this.selector;
		const userTemplate = await this.getTemplate(url, selector);
		const form = await userTemplate.cloneNode(true);
		this.form = form;
		return await this.form;
	}
}


// export const avatarForm = new AvatarForm({
// 	selector: ".input__wrapper",
// 	formUrl: '../templates/avatarForm.html',
// });