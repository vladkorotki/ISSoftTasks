
export class UserCard {
	constructor(options) {
		this.classUser = options.classUser;

		this.avatarClasssBlock = options.avatar.classBlock;
		this.avatarClassImg = options.avatar.classImg;
		this.avatarSrcAttribute = options.avatar.srcAttribute;
		this.avatarAltAttribute = options.avatar.altAttribute;

		this.userDataClass = options.userData.classUserData;

		this.userUserName = options.userData.classUserName;
		this.userUserPhone = options.userData.classUserPhone;
		this.userUserEmail = options.userData.classUserEmail;
		this.userUserAddress = options.userData.classUserAddress;
		this.userUserGender = options.userData.classUserGender;

		this.userUserControls = options.userControls.classUserControls;

		this.userUserBtn = options.userControls.classUserBtn;
		this.userUserBtnEdit = options.userControls.classUserBtnEdit;
		this.userUserBtnDelete = options.userControls.classUserBtnDelete;

		this.btnTextEdit = options.userControls.btnTextEdit;
		this.btnTextDelete = options.userControls.btnTextDelete;


		// this.main = document.querySelector('main');
	}

	createUserCard() {
		let div = document.createElement('div');
		let span = document.createElement('span');
		let img = document.createElement('img');
		let button = document.createElement('button');



		let user = div.cloneNode();
		user.classList.add(this.classUser);

		let userAvatar = div.cloneNode();
		userAvatar.classList.add(this.avatarClasssBlock);


		let avatar = img.cloneNode()
		avatar.classList.add(this.avatarClassImg);
		avatar.setAttribute('alt', this.avatarAltAttribute);
		avatar.setAttribute('src', this.avatarSrcAttribute)
		userAvatar.append(avatar);

		let userData = div.cloneNode();
		userData.classList.add(this.userDataClass);

		let userName = span.cloneNode();
		userName.classList.add(this.userUserName);
		userName.setAttribute('data-field', 'username');


		let userEmail = span.cloneNode();
		userEmail.classList.add(this.userUserEmail);
		userEmail.setAttribute('data-field', 'e-mail');

		let userPhone = span.cloneNode();
		userPhone.classList.add(this.userUserPhone);
		userPhone.setAttribute('data-field', 'phone');

		let userAddress = span.cloneNode();
		userAddress.classList.add(this.userUserAddress);
		userAddress.setAttribute('data-field', 'address');

		let userGender = span.cloneNode();
		userGender.classList.add(this.userUserGender);
		userGender.setAttribute('data-field', 'gender');

		userData.append(userName);
		userData.append(userEmail);
		userData.append(userPhone);
		userData.append(userAddress);
		userData.append(userGender);


		let userControls = div.cloneNode();
		userControls.classList.add(this.userUserControls);

		let btnControlsEdit = button.cloneNode();
		btnControlsEdit.classList.add(this.userUserBtn, this.userUserBtnEdit);
		btnControlsEdit.textContent = this.btnTextEdit;

		let btnControlsDelete = button.cloneNode();
		btnControlsDelete.classList.add(this.userUserBtn, this.userUserBtnDelete);
		btnControlsDelete.textContent = this.btnTextDelete;
		userControls.append(btnControlsEdit);
		userControls.append(btnControlsDelete);

		user.append(userAvatar);
		user.append(userData);
		user.append(userControls);
		return user;
	}
}

// const user = new UserCard({
// 	classUser: 'users__user',


// 	avatar: {
// 		classBlock: 'user__avatar',
// 		classImg: 'avatar',
// 		srcAttribute: '#url',
// 		altAttribute: 'avatar',
// 	},

// 	userData: {
// 		classUserData: 'user__data',

// 		classUserName: 'user__name',
// 		classUserPhone: 'user__phone',
// 		classUserEmail: 'user__email',
// 		classUserAddress: 'user__address',
// 		classUserGender: 'user__gender',
// 	},

// 	userControls: {
// 		classUserControls: 'user__controls',

// 		classUserBtn: 'btn',
// 		clasUserBtnEdit: 'btn__controls--edit',
// 		classUserBtnDelete: 'btn__controls--delete',
// 		btnTextEdit: 'edit',
// 		btnTextDelete: 'delete',
// 	},

// });

// let userCard = new UserCard()
// user.createUserCard()
// userCard.createUserCard()


