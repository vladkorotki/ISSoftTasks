import { UserCard } from './userCard.js';
import { UsersDataLayer } from '../dataLayer/usersDataLayer.js';

export class UsersCards {

	constructor(options) {
		this.main = document.querySelector(options.main);
		this.usersTemplate = document.getElementById(options.id);
		this.users = this.usersTemplate.content.querySelector(options.users);

		this.user = new UserCard({
			id: "userComponent",
			userClass: ".users__user",
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




	showUsers() {
		const users = this.users.cloneNode();

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
		console.log(users);
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

	// constructor(options) {

	// 	this.main = document.querySelector(options.main);
	// 	this.usersClass = options.users;



	// 	this.userCard = new UserCard({
	// 		classUser: 'users__user',


	// 		avatar: {
	// 			classBlock: 'user__avatar',
	// 			classImg: 'avatar',
	// 			srcAttribute: '#url',
	// 			altAttribute: 'avatar',
	// 		},

	// 		userData: {
	// 			classUserData: 'user__data',

	// 			classUserName: 'user__name',
	// 			classUserPhone: 'user__phone',
	// 			classUserEmail: 'user__email',
	// 			classUserAddress: 'user__address',
	// 			classUserGender: 'user__gender',
	// 			classUserBirth: 'user__birth',
	// 		},

	// 		userControls: {
	// 			classUserControls: 'user__controls',

	// 			classUserBtn: 'btn',
	// 			classUserBtnEdit: 'btn__controls--edit',
	// 			classUserBtnDelete: 'btn__controls--delete',
	// 			btnTextEdit: 'edit',
	// 			btnTextDelete: 'delete',
	// 		},
	// 		popupOpen: 'popup--open',

	// 	});

	// 	if (typeof UsersCards.instance === 'object') {
	// 		return UsersCards.instance;
	// 	}
	// 	UsersCards.instance = this;
	// 	return this;
	// }





	// showUsers() {
	// 	let div = document.createElement('div');
	// 	let users = div.cloneNode();
	// 	users.classList.add(this.usersClass);

	// 	let currentCard;
	// 	let usersStrorage = new UsersDataLayer({
	// 		dataTableName: 'Users'
	// 	});

	// 	let usersData = usersStrorage.allUsers();
	// 	if (usersData != null) {
	// 		for (let [key, value] of Object.entries(usersData)) {
	// 			currentCard = this.userCard.createUserCard();
	// 			let currentCardInputs = currentCard.querySelectorAll('span');
	// 			let buttonEdit = currentCard.querySelector(`.${this.userCard.userUserBtnEdit}`);
	// 			let buttonDelete = currentCard.querySelector(`.${this.userCard.userUserBtnDelete}`);

	// 			currentCardInputs.forEach(item => {
	// 				if (value[item.dataset.field]) {
	// 					item.textContent = `${item.dataset.field}: ${value[item.dataset.field]}`;
	// 					if (item.dataset.field == 'e-mail') {
	// 						item.setAttribute('data-key', key);
	// 						currentCard.setAttribute('data-key', key);
	// 						buttonEdit.setAttribute('data-key', key);
	// 						buttonDelete.setAttribute('data-key', key);
	// 					}
	// 				} else {
	// 					item.textContent = `${item.dataset.field}: --`;
	// 				}
	// 			});
	// 			users.append(currentCard);
	// 		}
	// 	}

	// 	return users;
	// }



	// currentUser(mail) {

	// 	let currentCard = this.userCard.createUserCard();
	// 	let currentCardInputs = currentCard.querySelectorAll('span');
	// 	let buttonEdit = currentCard.querySelector(`.${this.userCard.userUserBtnEdit}`);
	// 	let buttonDelete = currentCard.querySelector(`.${this.userCard.userUserBtnDelete}`);

	// 	let usersStrorage = new UsersDataLayer({
	// 		dataTableName: 'Users'
	// 	});

	// 	let usersData = usersStrorage.allUsers();
	// 	let currentUserData = usersData[mail];

	// 	currentCardInputs.forEach(item => {
	// 		if (currentUserData[item.dataset.field]) {
	// 			item.textContent = `${item.dataset.field}: ${currentUserData[item.dataset.field]}`;
	// 			if (item.dataset.field == 'e-mail') {
	// 				item.setAttribute('data-key', currentUserData[item.dataset.field]);
	// 				currentCard.setAttribute('data-key', currentUserData[item.dataset.field]);
	// 				buttonEdit.setAttribute('data-key', currentUserData[item.dataset.field]);
	// 				buttonDelete.setAttribute('data-key', currentUserData[item.dataset.field]);
	// 			}

	// 		} else {
	// 			item.textContent = `${item.dataset.field}: --`
	// 		}
	// 	});

	// 	return currentCard;

	// }

}

export const usersCards = new UsersCards({
	main: '.page__main',
	id: "usersComponent",
	users: ".users",
})



// export const usersCards = new UsersCards({
// 	main: '.page__main',
// 	users: 'users',
// });
