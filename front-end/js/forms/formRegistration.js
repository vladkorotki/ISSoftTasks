import { Form } from './form.js';
import { usersDataLayer } from '../dataLayer/usersDataLayer.js';
import { formContainer } from './formContainer.js';

export class FormRegistration extends Form {
	constructor(id) {
		super(id);
		if (typeof FormRegistration.instance === 'object') {
			return FormRegistration.instance;
		}
		FormRegistration.instance = this;
		return this;
	}

	async onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			const user = await this.createUser();
			const response = await usersDataLayer.addUser(user);
			const json = await response.json();
			const status = response.status;
			if (status == 400) {
				alert(json.message);
				return;
			}
			alert(json.message);
			formContainer.changeForm();
		}
	}

	async createUser() {
		const user = {};
		const inputs = this.inputs;
		for (let index = 0; index < inputs.length; index++) {
			if ([inputs[index].name] == 'repeat-password') continue;
			else user[inputs[index].name] = inputs[index].value;
		}
		return user;
	}
}

