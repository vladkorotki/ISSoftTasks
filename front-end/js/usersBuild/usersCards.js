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

		const usersData = await usersStrorage.allNewUsers();
		if (!usersData) {
			return;
		}

		if (usersData.status == 401) {
			return usersData;
		}

		if (usersData != null) {
			for (let [key, value] of Object.entries(usersData)) {
				currentCard = await this.user.createUserCard();
				const currentCardInputs = currentCard.querySelectorAll('.span');
				const buttonEdit = currentCard.querySelector('.btn__controls--edit');
				const buttonDelete = currentCard.querySelector('.btn__controls--delete');
				const avatar = currentCard.querySelector('.user__avatar');
				const avatarImg = avatar.querySelector('img');
				avatarImg.src = value.avatarUrl;
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
		const avatarImg = avatar.querySelector('img');
		const currentCardInputs = currentCard.querySelectorAll('.span');
		const buttonEdit = currentCard.querySelector('.btn__controls--edit');
		const buttonDelete = currentCard.querySelector('.btn__controls--delete');
		const buttonAvatar = avatarForm.querySelector('.btn--avatar');
		const usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		const currentNewUserData = await usersStrorage.getUser(mail);
		avatarImg.src = await currentNewUserData.avatarUrl;

		if (!currentNewUserData) {
			return;
		}
		if (currentNewUserData.status == 401) {
			return currentNewUserData;
		}
		currentCardInputs.forEach(item => {
			if (currentNewUserData[item.dataset.field]) {
				item.textContent = `${item.dataset.field}: ${currentNewUserData[item.dataset.field]}`;
				if (item.dataset.field == 'email') {
					item.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					currentCard.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					buttonEdit.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					buttonDelete.setAttribute('data-key', currentNewUserData[item.dataset.field]);
					buttonAvatar.setAttribute('data-key', currentNewUserData[item.dataset.field]);
				}
			}

			else {
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