import { Form } from './form.js';
import { usersDataLayer } from './usersDataLayer.js';
import { formContainer } from './formContainer.js';



export class FormRegistration extends Form {
	constructor(id) {
		super(id);
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			this.createUser();
			usersDataLayer.add(this.createUser(), 'e-mail');
			formContainer.changingForm(event);
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

