import { UserCard } from './userCard.js';
import { UsersDataLayer } from '../dataLayer/usersDataLayer.js';
import { Component } from './component.js';

import { AvatarForm } from './avatarForm.js';
export class UsersCards extends Component {

	constructor(options) {
		super(options);
		this.options = options;
		this.main = document.querySelector(options.main);

		this.users;
		this.usersUrl = options.usersUrl;
		this.user = new UserCard({
			userClass: ".users__user",
			userUrl: '../templates/user.html',
		});

		this.avatarForm = new AvatarForm({
			selector: ".input__wrapper",
			formUrl: '../templates/avatarForm.html',
		});

		if (typeof UsersCards.instance === 'object') {
			return UsersCards.instance;
		}
		UsersCards.instance = this;
		return this;
	}

	async showUsers() {
		const url = this.usersUrl;
		const selector = this.options.users
		const usersTemplate = await this.getTemplate(url, selector);
		const users = await usersTemplate.cloneNode();
		this.users = users;
		let currentCard;
		let usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		// let usersData = usersStrorage.allUsers();
		const usersData = await usersStrorage.allNewUsers();

		// const status = await usersData.status;
		// if (status == 401) {
		// 	const result = await usersData.json();
		// 	alert(result.message);
		// 	return;
		// }
		console.log(usersData);
		if (usersData != null) {
			for (let [key, value] of Object.entries(usersData)) {
				currentCard = await this.user.createUserCard();
				let currentCardInputs = currentCard.querySelectorAll('.span');
				let buttonEdit = currentCard.querySelector('.btn__controls--edit');
				let buttonDelete = currentCard.querySelector('.btn__controls--delete');

				currentCardInputs.forEach(item => {
					if (value[item.dataset.field]) {
						item.textContent = `${item.dataset.field}: ${value[item.dataset.field]}`;
						if (item.dataset.field == 'email') {
							item.setAttribute('data-key', key);
							currentCard.setAttribute('data-key', key);
							buttonEdit.setAttribute('data-key', key);
							buttonDelete.setAttribute('data-key', key);
						}
					} else {
						item.textContent = `${item.dataset.field}: --`;
					}
				});
				this.users.append(currentCard);
			}
		}

		return await this.users;
	}

	async currentUser(mail) {
		const currentCard = await this.user.createUserCard();
		const avatarForm = await this.avatarForm.createFormAvatar();
		const avatar = currentCard.querySelector('.user__avatar');
		const currentCardInputs = currentCard.querySelectorAll('.span');
		const buttonEdit = currentCard.querySelector('.btn__controls--edit');
		const buttonDelete = currentCard.querySelector('.btn__controls--delete');

		const usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});
		// const usersData = usersStrorage.allUsers();
		// const currentUserData = usersData[mail];
		const testusersData = await usersStrorage.allNewUsers();
		const currentNewUserData = await testusersData[mail];
		currentCardInputs.forEach(item => {
			if (currentNewUserData[item.dataset.field]) {
				item.textContent = `${item.dataset.field}: ${currentNewUserData[item.dataset.field]}`;
				if (item.dataset.field == 'email') {
					item.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					currentCard.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					buttonEdit.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					buttonDelete.setAttribute('data-key', currentNewUserData[item.dataset.field]);
				}

			} else {
				item.textContent = `${item.dataset.field}: --`
			}
		});
		avatar.prepend(avatarForm);
		return await currentCard;
	}
}

export const usersCards = new UsersCards({
	main: '.page__main',
	id: "usersComponent",
	users: ".users",
	usersUrl: '../templates/users.html',
});