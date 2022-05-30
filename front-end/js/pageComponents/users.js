// import { User } from './user.js';
// import { UsersDataLayer } from '../dataLayer/usersDataLayer.js';
// export class Users {
// 	constructor(options) {
// 		this.main = document.querySelector(options.main);
// 		this.usersTemplate = document.getElementById(options.id);
// 		this.users = this.usersTemplate.content.querySelector(options.users);
// 		this.user = new User({
// 			id: "userComponent",
// 			user: ".users__user",
// 		});
// 		// window.addEventListener('load', () => this.render());

// 		// window.addEventListener('load', () => this.showUsers());


// 	}

// 	render() {
// 		console.log(this.users);
// 		return this.users;
// 	}




// 	showUsers() {
// 		let currentCard;
// 		let usersStrorage = new UsersDataLayer({
// 			dataTableName: 'Users'
// 		});

// 		let usersData = usersStrorage.allUsers();
// 		if (usersData != null) {
// 			for (let [key, value] of Object.entries(usersData)) {
// 				currentCard = this.user.render();
// 				let currentCardInputs = currentCard.querySelectorAll('span');
// 				let buttonEdit = currentCard.querySelector('.btn__controls--edit');
// 				let buttonDelete = currentCard.querySelector('.btn__controls--delete');

// 				currentCardInputs.forEach(item => {
// 					if (value[item.dataset.field]) {
// 						item.textContent = `${item.dataset.field}: ${value[item.dataset.field]}`;
// 						if (item.dataset.field == 'e-mail') {
// 							item.setAttribute('data-key', key);
// 							currentCard.setAttribute('data-key', key);
// 							buttonEdit.setAttribute('data-key', key);
// 							buttonDelete.setAttribute('data-key', key);
// 						}
// 					} else {
// 						item.textContent = `${item.dataset.field}: --`;
// 					}
// 				});
// 				this.users.append(currentCard);
// 			}
// 		}
// 		console.log(this.users);
// 		return this.users;
// 	}



// 	currentUser(mail) {

// 		let currentCard = this.user.render();
// 		let currentCardInputs = currentCard.querySelectorAll('span');
// 		let buttonEdit = currentCard.querySelector('.btn__controls--edit');
// 		let buttonDelete = currentCard.querySelector('.btn__controls--delete');

// 		let usersStrorage = new UsersDataLayer({
// 			dataTableName: 'Users'
// 		});

// 		let usersData = usersStrorage.allUsers();
// 		let currentUserData = usersData[mail];

// 		currentCardInputs.forEach(item => {
// 			if (currentUserData[item.dataset.field]) {
// 				item.textContent = `${item.dataset.field}: ${currentUserData[item.dataset.field]}`;
// 				if (item.dataset.field == 'e-mail') {
// 					item.setAttribute('data-key', currentUserData[item.dataset.field]);
// 					currentCard.setAttribute('data-key', currentUserData[item.dataset.field]);
// 					buttonEdit.setAttribute('data-key', currentUserData[item.dataset.field]);
// 					buttonDelete.setAttribute('data-key', currentUserData[item.dataset.field]);
// 				}

// 			} else {
// 				item.textContent = `${item.dataset.field}: --`
// 			}
// 		});

// 		return currentCard;

// 	}
// }