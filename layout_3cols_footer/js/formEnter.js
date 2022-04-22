import { Form } from './form.js';
import { popup } from './popUp.js';
import { usersDataLayer } from './usersDataLayer.js';


export class FormSignIn extends Form {
	constructor(options) {
		super(options.id);
		this.starterForm = document.querySelector(options.starterForm);
		this.userPanel = document.querySelector(options.userPanel)
		this.exitUserPanel = document.querySelector(options.exitUserPanel);
	}

	signIn(event) {
		const compare = usersDataLayer.compareUsers(this.userData()['e-mail'], this.userData().password);
		if (compare) {
			alert('hi')
			this.starterForm.classList.remove('initial__form--active');
			this.userPanel.classList.add('user__panel--active');
			popup.close(event)
		} else {
			alert('Не верный e-mail или пароль')
		}
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
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

