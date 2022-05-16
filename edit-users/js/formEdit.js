import { Form } from './form.js';
import { usersDataLayer } from './usersDataLayer.js';
import { usersCards } from './usersCards.js';
import { UserPanel } from './userPanel.js';


export class FormEdit extends Form {
	constructor(options) {
		super(options.id);
		this.usersCards = usersCards.showUsers();
		this.buttonsEdit = this.usersCards.querySelectorAll(`.${usersCards.userCard.userUserBtnEdit}`);
		document.addEventListener('click', (event) => { this.findKeyButton(event) });
		this.key;
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			if (usersDataLayer.allUsers() != null && usersDataLayer.allUsers().hasOwnProperty([this.key])) {
				alert('Данные добавлены');
				console.log(this.key);
				const users = document.querySelector('.users');
				// users.remove()

				usersDataLayer.delete(usersDataLayer.allUsers(), this.key);
				const dataLayer = usersDataLayer.add(this.userData(), ['e-mail']);
				// this.userPanel = new UserPanel({
				// 	userPanel: '.user__panel',
				// 	initialForm: '.initial__form',
				// 	btnExit: '.btn--exit',
				// 	btnEdit: '.btn--edit',
				// 	btnBack: '.btn--back',
				// 	btnHideClass: 'btn--hide',
				// 	initialFormActiveClass: 'initial__form--active',
				// 	userPanelActiveCLass: 'user__panel--active',
				// 	eventType: 'click',
				// });
				// this.userPanel.edit(event);
				// this.userPanel.back(event);
				// this.userPanel.edit(event);



			} else {
				alert('Пользователь с таким e-mail не существует');
			}
		}
	}



	findKeyButton(event) {
		if (event.target.hasAttribute('data-key')) {
			this.key = event.target.dataset.key;
			console.log(this.key);
			return this.key;
		}

	}

	userData() {
		let mail = this.key;
		console.log(mail);
		let currentUser = usersDataLayer.curentUser(mail);
		let user = this.updateUser();

		user = Object.assign(currentUser, user);
		console.log(user);
		return user;
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

