// import { usersDataLayer } from './usersDataLayer.js';

class UserCard {
	constructor(options) {
		this.classUser = options.classUser;

		this.avatarClasssBlock = options.avatar.classBlock;
		this.avatarClassImg = options.avatar.classImg;
		this.avatarSrcAttribute = options.avatar.srcAttribute;
		this.avatarAltAttribute = options.avatar.altAttribute;

		this.userDataClass = options.userData.classUserData;

		this.main = document.querySelector('main');
	}

	createUserCard() {
		let div = document.createElement('div');
		let span = document.createElement('span');
		let img = document.createElement('img');
		let button = document.createElement('button');

		let users = div.cloneNode();
		users.classList.add('users');

		let user = div.cloneNode();
		user.classList.add();

		let userAvatar = div.cloneNode();
		userAvatar.classList.add('user__avatar');


		let avatar = img.cloneNode()
		avatar.classList.add('avatar');
		avatar.setAttribute('alt', 'avatar');
		avatar.setAttribute('src', '#')
		userAvatar.append(avatar);

		let userData = div.cloneNode();
		userData.classList.add('user__data');

		let userName = span.cloneNode();
		userName.classList.add('user__name');

		let userEmail = span.cloneNode();
		userEmail.classList.add('user__email');

		let userPhone = span.cloneNode();
		userPhone.classList.add('user__phone');

		let userAddress = span.cloneNode();
		userAddress.classList.add('user__address');

		let userGender = span.cloneNode();
		userGender.classList.add('user__gender');
		userData.append(userName);
		userData.append(userEmail);
		userData.append(userPhone);
		userData.append(userAddress);
		userData.append(userGender);


		let userControls = div.cloneNode();
		userControls.classList.add('user__controls');

		let btnControlsEdit = button.cloneNode();
		btnControlsEdit.classList.add('btn', 'btn__controls--edit');
		btnControlsEdit.textContent = 'edit';

		let btnControlsDelete = button.cloneNode();
		btnControlsDelete.classList.add('btn', 'btn__controls--delete');
		btnControlsDelete.textContent = 'delete';
		userControls.append(btnControlsEdit);
		userControls.append(btnControlsDelete);

		user.append(userAvatar);
		user.append(userData);
		user.append(userControls);
		// return user;

		users.append(user);
		console.log(this.main);
		this.main.append(users)


	}


}

const user = new UserCard({
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
		textContentEdit: 'edit',
		textContentDelete: 'delete',
	},

});

// let userCard = new UserCard()
user.createUserCard()
// userCard.createUserCard()


