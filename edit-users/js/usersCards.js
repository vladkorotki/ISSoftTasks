import { formContainer } from './formContainer.js';
import { UserCard } from './userCard.js';
import { UsersDataLayer } from './usersDataLayer.js';
export class UsersCards {
	constructor(options) {

		this.main = document.querySelector(options.main);
		this.usersClass = options.users;



		this.userCard = new UserCard({
			classUser: 'users__user',


			avatar: {
				classBlock: 'user__avatar',
				classImg: 'avatar',
				srcAttribute: '#url',
				altAttribute: 'avatar',
			},

			userData: {
				classUserData: 'user__data',

				classUserName: 'user__name',
				classUserPhone: 'user__phone',
				classUserEmail: 'user__email',
				classUserAddress: 'user__address',
				classUserGender: 'user__gender',
			},

			userControls: {
				classUserControls: 'user__controls',

				classUserBtn: 'btn',
				classUserBtnEdit: 'btn__controls--edit',
				classUserBtnDelete: 'btn__controls--delete',
				btnTextEdit: 'edit',
				btnTextDelete: 'delete',
			},
			popupOpen: 'popup--open',
			// calback: formContainer.showForm,
			calback: this.userKey,
		});

		if (typeof UsersCards.instance === 'object') {
			return UsersCards.instance;
		}
		UsersCards.instance = this;
		return this;
	}


	userKey(event) {
		console.log(event.target.dataset.key);
		return event.target.dataset.key;
	}

	getKey(event) {
		if (event.target.closest(this.userCard.userUserBtnEdit)) {
			console.log(event.target.dataset.key);
			return event.target.dataset.key;
		}
	}

	showUsers() {
		let div = document.createElement('div');
		let users = div.cloneNode();
		users.classList.add(this.usersClass);

		let currentCard;
		let usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		let usersData = usersStrorage.allUsers();

		for (let [key, value] of Object.entries(usersData)) {
			currentCard = this.userCard.createUserCard();
			let currentCardInputs = currentCard.querySelectorAll('span');
			let buttonEdit = currentCard.querySelector(`.${this.userCard.userUserBtnEdit}`)

			currentCardInputs.forEach(item => {
				if (value[item.dataset.field]) {
					item.textContent = `${item.dataset.field}: ${value[item.dataset.field]}`;
					if (item.dataset.field == 'e-mail') {
						item.setAttribute('data-key', key);
						currentCard.setAttribute('data-key', key);
						buttonEdit.setAttribute('data-key', key);
					}
				} else {
					item.textContent = `${item.dataset.field}: --`;
				}
			});
			users.appendChild(currentCard);
		}
		return users;
	}



	currentUser(mail) {
		let currentCard = this.userCard.createUserCard();
		let currentCardInputs = currentCard.querySelectorAll('span');
		let buttonEdit = currentCard.querySelector(`.${this.userCard.userUserBtnEdit}`)
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
				}

			} else {
				item.textContent = `${item.dataset.field}: --`
			}
		});

		return currentCard;

	}



	// usersData = Object.entries(usersData);
	// for (let i = 0; i < usersData.length; i++) {
	// 	currentCard = this.userCard.createUserCard();
	// 	let currentCardInputs = currentCard.querySelectorAll('span');
	// 	let currentUserData = usersData[i];
	// 	currentCardInputs.forEach(item => {
	// 		if (currentUserData[1][item.dataset.field]) {
	// 			item.textContent = `${item.dataset.field}: ${currentUserData[1][item.dataset.field]}`
	// 		} else {
	// 			item.textContent = `${item.dataset.field}: --`
	// 		}
	// 	});
	// 	users.appendChild(currentCard);
	// }
}



export const usersCards = new UsersCards({
	main: '.page__main',
	users: 'users',
});
