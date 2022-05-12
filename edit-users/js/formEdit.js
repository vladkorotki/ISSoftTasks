import { Form } from './form.js';
import { usersDataLayer } from './usersDataLayer.js';
import { usersCards } from './usersCards.js';

export class FormEdit extends Form {
	constructor(options) {
		super(options.id);

	}

	onFormSubmit(event) {

		const submited = super.onFormSubmit(event);
		this.inputs = this.form.querySelectorAll('.input');
		this.buttonsEdit = usersCards.main.querySelectorAll(`.${usersCards.userCard.userUserBtnEdit}`);
		if (submited) {
			let user = this.userData(event);
			console.log(this.buttonsEdit);
			console.log(this.keyUser(event));
			// console.log(user);
			return
		}
	}







	userData(event) {
		let mail = usersCards.userKey(event);
		console.log(mail);
		let currentUser = usersDataLayer.curentUser(mail);
		let user = {};
		const inputs = this.inputs;
		for (let i = 0; i < inputs.length; i++) {
			user[inputs[i].name] = inputs[i].value;
		}
		user = Object.assign(currentUser, user);
		return user;
	}

}

