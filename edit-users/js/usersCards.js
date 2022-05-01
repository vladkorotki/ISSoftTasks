import { UserCard } from './userCard.js';
export class UsersCards {
	constructor(options) {
		this.main = document.querySelector(options.main);
		this.usersClass = options.users;
		this.user = new UserCard({
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

		users.append(this.user.createUserCard());
		return users;
		// this.main.append(users);
	}

}



