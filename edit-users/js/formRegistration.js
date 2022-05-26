import { Form } from './form.js';
import { usersDataLayer } from './usersDataLayer.js';
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

	//old MEthod
	// onFormSubmit(event) {
	// 	const submited = super.onFormSubmit(event);
	// 	if (submited) {
	// 		this.createUser();
	// 		const dataLayer = usersDataLayer.add(this.createUser(), 'e-mail');

	// 		if (dataLayer) {
	// 			formContainer.changeForm();
	// 		}
	// 	}
	// }


	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			if (usersDataLayer.allUsers() != null && usersDataLayer.allUsers().hasOwnProperty(this.createUser()['e-mail'])) {
				alert('Пользователь с таким e-mail уже существует');

			} else {
				alert('Поздравляем вы успешно зарегистрировались')
				const dataLayer = usersDataLayer.add(this.createUser(), 'e-mail');
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

