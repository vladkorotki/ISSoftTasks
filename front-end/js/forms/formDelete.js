import { Form } from './form.js';
import { usersDataLayer } from '../dataLayer/usersDataLayer.js';
import { usersCards } from '../usersBuild/usersCards.js';
import { popup } from '../pageTools/popUp.js';
import { mainContent } from '../pageTools/mainContent.js';

export class FormDelete extends Form {

	constructor(options) {
		super(options.id);
		this.submitBtn = this.form.querySelector(options.submitBtn);
		this.cancelBtn = this.form.querySelector(options.cancelBtn);

		document.addEventListener('click', (event) => { this.findKeyButton(event) });
		this.cancelBtn.addEventListener('click', (event) => { popup.close(event) });

		this.key;

		if (typeof FormDelete.instance === 'object') {
			return FormDelete.instance;
		}

		FormDelete.instance = this;
		return this;
	}

	async onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			const allUsers = await usersDataLayer.allNewUsers();

			if (allUsers != null && allUsers.hasOwnProperty([this.key])) {
				let tokenKey = JSON.parse(localStorage.getItem('token'))['email'];
				let currentUser = await usersDataLayer.currentNewUser(this.key);
				let id = currentUser.id;
				await usersDataLayer.newDelete(id);

				if (this.key == tokenKey) {
					mainContent.panelUser.exit();
					popup.close(event);
					return;
				}

				alert('Пользователь удален');
				await mainContent.updateCards(this.key);
				await mainContent.updateCurrentCard(this.key);
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
}

export const deleteForm = new FormDelete({
	id: 'deleteForm',
	submitBtn: '.btn--submit',
	cancelBtn: '.btn--cancel',
});


