import { UserCard } from './userCard.js';
import { UsersDataLayer } from '../dataLayer/usersDataLayer.js';

export class UsersCards {

	constructor(options) {
		this.options = options;
		this.main = document.querySelector(options.main);

		this.users;
		this.usersUrl = options.usersUrl;
		this.user = new UserCard({
			userClass: ".users__user",
			userUrl: '../templates/user.html',
		});

		if (typeof UsersCards.instance === 'object') {
			return UsersCards.instance;
		}
		UsersCards.instance = this;
		return this;
	}

	async getTemplate() {
		let response = await fetch(this.usersUrl);
		const template = await response.text();
		const newUsers = new DOMParser().parseFromString(template, "text/html");
		const usersTemplate = newUsers.querySelector(this.options.users);

		return await usersTemplate;
	}

	async showUsers() {
		const usersTemplate = await this.getTemplate();
		const users = await usersTemplate.cloneNode();
		this.users = users;
		let currentCard;
		let usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		let usersData = usersStrorage.allUsers();
		if (usersData != null) {
			for (let [key, value] of Object.entries(usersData)) {
				currentCard = await this.user.createUserCard();
				let currentCardInputs = currentCard.querySelectorAll('span');
				let buttonEdit = currentCard.querySelector('.btn__controls--edit');
				let buttonDelete = currentCard.querySelector('.btn__controls--delete');

				currentCardInputs.forEach(item => {
					if (value[item.dataset.field]) {
						item.textContent = `${item.dataset.field}: ${value[item.dataset.field]}`;
						if (item.dataset.field == 'e-mail') {
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
		let currentCard = await this.user.createUserCard();
		let currentCardInputs = currentCard.querySelectorAll('span');
		let buttonEdit = currentCard.querySelector('.btn__controls--edit');
		let buttonDelete = currentCard.querySelector('.btn__controls--delete');

		let usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		let usersData = usersStrorage.allUsers();
		let currentUserData = usersData[mail];

		currentCardInputs.forEach(item => {
			if (currentUserData[item.dataset.field]) {
				item.textContent = `${item.dataset.field}: ${currentUserData[item.dataset.field]}`;
				if (item.dataset.field == 'e-mail') {
					item.setAttribute('data-key', currentUserData[item.dataset.field]);
					currentCard.setAttribute('data-key', currentUserData[item.dataset.field]);
					buttonEdit.setAttribute('data-key', currentUserData[item.dataset.field]);
					buttonDelete.setAttribute('data-key', currentUserData[item.dataset.field]);
				}

			} else {
				item.textContent = `${item.dataset.field}: --`
			}
		});

		return await currentCard;
	}
}

export const usersCards = new UsersCards({
	main: '.page__main',
	id: "usersComponent",
	users: ".users",
	usersUrl: '../templates/users.html',
});