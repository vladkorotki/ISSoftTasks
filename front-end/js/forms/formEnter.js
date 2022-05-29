import { Form } from './form.js';

import { popup } from '../pageTools/popUp.js';
import { usersDataLayer } from '../dataLayer/usersDataLayer.js';
import { panelUser } from '../usersBuild/userPanel.js';


export class FormSignIn extends Form {
	constructor(options) {
		super(options.id);
		this.starterForm = document.querySelector(options.starterForm);
		this.userPanel = panelUser;

		if (typeof FormSignIn.instance === 'object') {
			return FormSignIn.instance;
		}
		FormSignIn.instance = this;
		return this;

	}

	signIn(event) {
		const compare = usersDataLayer.compareUsers(this.userData()['e-mail'], this.userData().password);
		if (compare) {
			alert('hi');
			this.userPanel.showPanel(this.userData()['e-mail'], event);
			usersDataLayer.createToken(this.userData());
			popup.close(event)
		} else {
			alert('Не верный e-mail или пароль')
		}
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			usersDataLayer.addTable(this.dataTableName);
			this.userData();
			this.signIn(event);
		}
	}

	userData() {
		let user = {};
		const inputs = this.inputs;
		for (let i = 0; i < inputs.length; i++) {
			user[inputs[i].name] = inputs[i].value;
		}
		return user;
	}



}

