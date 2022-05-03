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
				clasUserBtnEdit: 'btn__controls--edit',
				classUserBtnDelete: 'btn__controls--delete',
				btnTextEdit: 'edit',
				btnTextDelete: 'delete',
			},

		});
	}

	showUsers() {
		let div = document.createElement('div');
		let users = div.cloneNode();
		users.classList.add(this.usersClass);
		users.append(this.userCard.createUserCard());
		console.log(this.usersData);
		return users;
	}

	currentUser(mail) {
		let currentCard = this.userCard.createUserCard();
		let currentCardInputs = currentCard.querySelectorAll('span');
		let usersStrorage = new UsersDataLayer({
			dataTableName: 'Users'
		});

		let usersData = usersStrorage.allUsers();
		let currentUserData = usersData[mail];

		currentCardInputs.forEach(item => {
			if (currentUserData[item.dataset.field]) {
				item.textContent = `${item.dataset.field}: ${currentUserData[item.dataset.field]}`
			} else {
				item.textContent = `${item.dataset.field}: --`
			}
		});

		return currentCard;

	}

}



