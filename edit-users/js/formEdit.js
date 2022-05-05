import { Form } from './form.js';
import { usersDataLayer } from './usersDataLayer.js';
import { formContainer } from './formContainer.js';
export class FormEdit extends Form {
	constructor(id) {
		super(id);
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			this.createUser();
			const dataLayer = usersDataLayer.add(this.createUser(), 'e-mail');
			console.log(dataLayer);
			if (dataLayer) {
				formContainer.changeForm();
			}
		}
	}

	createUser() {
		const user = {};
		const inputs = this.inputs;
		for (let index = 0; index < inputs.length; index++) {
			if ([inputs[index].name] == 'repeat-password') continue;
			else user[inputs[index].name] = inputs[index].value;
		}
		return user;
	}

}