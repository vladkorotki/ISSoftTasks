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
		const user = await this.createUser();
		// (usersDataLayer.allUsers() != null && usersDataLayer.allUsers().hasOwnProperty(user['email']))
		if (submited) {
			const allUsers = await usersDataLayer.allNewUsers();
			if (allUsers != null && allUsers.hasOwnProperty(user['email'])) {
				alert('Пользователь с таким e-mail уже существует');
			} else {
				await usersDataLayer.addUser(user);
				alert('Поздравляем вы успешно зарегистрировались')
				const dataLayer = usersDataLayer.add(user, 'email');
				formContainer.changeForm();
			}
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

