import { Form } from './form.js';
import { usersDataLayer } from '../dataLayer/usersDataLayer.js';
import { usersCards } from '../usersBuild/usersCards.js';
import { popup } from '../pageTools/popUp.js';
import { router } from '../pageTools/router.js';
// import { panelUser } from '../usersBuild/userPanel.js';
import { mainContent } from '../pageTools/mainContent.js';


export class FormEdit extends Form {
	constructor(options) {
		super(options.id);
		this.usersCards = usersCards.showUsers();
		this.submitBtn = this.form.querySelector(options.submitBtn);

		document.addEventListener('click', (event) => { this.findKeyButton(event) });
		this.key;

		if (typeof FormEdit.instance === 'object') {
			return FormEdit.instance;
		}
		FormEdit.instance = this;
		return this;
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);

		if (submited) {

			if (usersDataLayer.allUsers() != null && usersDataLayer.allUsers().hasOwnProperty([this.key])) {
				alert('Данные добавлены');
				const users = document.querySelector('.users');
				const dataLayer = usersDataLayer.add(this.userData(), ['e-mail']);

				mainContent.updateCards();
				mainContent.updateCurrentCard(this.key);
				popup.close(event);

			} else {
				alert('Пользователь с таким e-mail не существует');
			}
		}
	}





	findKeyButton(event) {
		if (event.target.hasAttribute('data-key')) {
			this.key = event.target.dataset.key;

			return this.key;
		}

	}

	userData() {
		let mail = this.key;

		let currentUser = usersDataLayer.currentUser(mail);
		let user = this.updateUser();

		user = Object.assign(currentUser, user);

		return user;
	}

	inputsValues() {
		let mail = this.key;
		let user = usersDataLayer.currentUser(mail);

		this.inputs.forEach(input => {
			if (input.type != 'radio') {
				for (let [key, value] of Object.entries(user)) {
					if (input.name == key) {
						input.value = value;
						break;
					} else {
						input.value = '';
					}
				}
			}
		});
	}




	updateUser() {
		const user = {};
		const inputs = this.inputs;
		for (let index = 0; index < inputs.length; index++) {
			if ([inputs[index].name] == 'gender' && !inputs[index].checked) continue;
			else user[inputs[index].name] = inputs[index].value;
		}
		return user;
	}


}

export const editForm = new FormEdit({
	id: 'editForm',
	submitBtn: '.btn--change',
});
