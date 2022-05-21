import { Form } from './form.js';
import { usersDataLayer } from './usersDataLayer.js';
import { usersCards } from './usersCards.js';
import { popup } from './popUp.js';
import { panelUser } from './userPanel.js';

export class FormDelete extends Form {

	constructor(options) {
		super(options.id);
		this.usersCards = usersCards.showUsers();
		this.submitBtn = this.form.querySelector(options.submitBtn);
		this.cancelBtn = this.form.querySelector(options.cancelBtn);

		this.editOk;

		document.addEventListener('click', (event) => { this.findKeyButton(event) });
		this.key;
		if (typeof FormDelete.instance === 'object') {
			return FormDelete.instance;
		}
		FormDelete.instance = this;
		return this;
	}


	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			this.editOk = true;
			if (usersDataLayer.allUsers() != null && usersDataLayer.allUsers().hasOwnProperty([this.key])) {
				alert('Пользователь удален');
				usersDataLayer.delete(this.key);


				if (this.submitBtn.classList.contains('currentBtn')) {
					panelUser.updateCurrentCard(this.key);
					panelUser.updateCards();
					popup.close(event);
				}
				else {
					panelUser.updateCards();
					panelUser.updateCurrentCard(this.key);
					popup.close(event);
				}



			} else {
				this.editOk = false;
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