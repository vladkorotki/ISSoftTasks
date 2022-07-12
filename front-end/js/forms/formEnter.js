import { Form } from './form.js';
import { popup } from '../pageTools/popUp.js';
import { usersDataLayer } from '../dataLayer/usersDataLayer.js';
import { router } from '../pageTools/router.js';

export class FormSignIn extends Form {
	constructor(options) {
		super(options.id);
		this.starterForm = document.querySelector(options.starterForm);
		// this.userPanel = panelUser;
		this.checkSubmit = false;
		if (typeof FormSignIn.instance === 'object') {
			return FormSignIn.instance;
		}
		FormSignIn.instance = this;
		return this;
	}

	async onFormSubmit(event) {
		const submited = super.onFormSubmit(event);

		if (submited) {
			const user = this.userData();
			const response = await usersDataLayer.login(user);
			const json = await response.json();
			const status = response.status;
			if (status == 400) {
				alert(json.message);
				return;
			}
			console.log(json.token);
			usersDataLayer.addTable(this.dataTableName);
			this.userData();
			router.setLocation('/user');
			this.checkSubmit = true;
			popup.close(event)

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



	// OLD METHOD
	// async signIn(event) {
	// 	const compare = await usersDataLayer.compareNewUsers(this.userData().email, this.userData().password);
	// 	if (compare) {
	// 		alert('hi');
	// 		// this.userPanel.showPanel(this.userData()['email'], event);
	// 		// usersDataLayer.createToken(this.userData());
	// 		popup.close(event)
	// 		return true;
	// 	} else {
	// 		alert('Не верный e-mail или пароль');
	// 		return false;
	// 	}
	// }

	// OLD METHOD
	// async onFormSubmit(event) {
	// 	const submited = super.onFormSubmit(event);
	// 	let sign = await this.signIn(event);
	// 	if (submited) {
	// 		if (!sign) {
	// 			return;
	// 		} else {
	// 			usersDataLayer.addTable(this.dataTableName);
	// 			this.userData();
	// 			router.setLocation('/user');
	// 			this.checkSubmit = true;
	// 		}
	// 	}
	// }

}

export const formEnter = new FormSignIn({
	id: 'enterForm',
	starterForm: '.initial__form',
	userPanel: '.user__panel',
	exitUserPanel: '.btn--exit',
});