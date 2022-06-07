import { UserCard } from './userCard.js';
import { UsersDataLayer } from '../dataLayer/usersDataLayer.js';

export class UsersCards {

	constructor(options) {
		this.options = options;
		this.main = document.querySelector(options.main);
		this.usersTemplate = document.getElementById(options.id);
		this.users = this.usersTemplate.content.querySelector(options.users);

		// this.users = this.getTemplate();
		this.usersUrl = options.usersUrl;
		this.user = new UserCard({
			id: "userComponent",
			userClass: ".users__user",
			userUrl: '../templates/user.html',
		});


		if (typeof UsersCards.instance === 'object') {
			return UsersCards.instance;
		}
		UsersCards.instance = this;
		return this;

	}

	// render() {
	// 	const users = this.users.cloneNode();
	// 	return users;
	// }

	async getTemplate() {
		let response = await fetch(this.usersUrl);
		const template = await response.text();
		const newUsers = new DOMParser().parseFromString(template, "text/html");
		const usersTemplate = newUsers.querySelector(this.options.users);

		// console.dir(usersTemplate);
		// console.log(usersTemplate);

		return usersTemplate;
	}


	showUsers() {
		const users = this.users.cloneNode();
		// const users = this.getTemplate();
		console.log(this.getTemplate());
		let currentCard;
		let usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		let usersData = usersStrorage.allUsers();
		if (usersData != null) {
			for (let [key, value] of Object.entries(usersData)) {
				currentCard = this.user.createUserCard();
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
				users.append(currentCard);
			}
		}
		// console.log(users);
		return users;
	}



	currentUser(mail) {

		let currentCard = this.user.createUserCard();
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

		return currentCard;

	}



}

export const usersCards = new UsersCards({
	main: '.page__main',
	id: "usersComponent",
	users: ".users",
	usersUrl: '../templates/users.html',
})

// console.log(usersCards.getTemplate());



// export const usersCards = new UsersCards({
// 	main: '.page__main',
// 	users: 'users',
// });
