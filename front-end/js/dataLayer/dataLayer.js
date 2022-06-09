export class DataLayer {
	constructor() {
		if (typeof DataLayer.instance === 'object') {
			return DataLayer.instance;
		}
		DataLayer.instance = this;
		return this;
	}

	addTable(dataTableName) {
		if (!localStorage.getItem(dataTableName)) {
			return localStorage.setItem(dataTableName, JSON.stringify({}));
		}
	}

	//old METHOD
	// add(dataTableName, userObject, keyProperty) {
	// 	this.addTable(dataTableName);
	// 	// let allUsers = JSON.parse(localStorage.getItem(dataTableName));
	// 	let allUsers = this.getUsers(dataTableName);
	// 	const mail = userObject[keyProperty];
	// 	if (allUsers.hasOwnProperty(mail)) {
	// 		alert('Пользователь с таким e-mail уже существует');
	// 		return false;

	// 	} else {
	// 		allUsers[mail] = userObject;
	// 		alert('Поздравляем вы успешно зарегистрировались')
	// 		localStorage.setItem(dataTableName, JSON.stringify(allUsers));
	// 		return true;
	// 	}
	// }


	add(dataTableName, userObject, keyProperty) {
		this.addTable(dataTableName);
		// let allUsers = JSON.parse(localStorage.getItem(dataTableName));
		let allUsers = this.getUsers(dataTableName);
		const mail = userObject[keyProperty];
		allUsers[mail] = userObject;
		localStorage.setItem(dataTableName, JSON.stringify(allUsers));
		return true;
	}

	createToken(userObject) {
		localStorage.setItem('token', JSON.stringify(userObject));
	}

	deleteToken() {
		// localStorage.setItem('token', null);
		localStorage.removeItem('token');
	}

	delete(dataTableName, userObject) {
		let allUsers = this.getUsers(dataTableName);

		delete allUsers[userObject];
		// localStorage.removeItem(dataTableName, userObject);

		return localStorage.setItem(dataTableName, JSON.stringify(allUsers));
	}

	compareUsers(dataTableName, userMail, userPassword) {
		// let allUsers = JSON.parse(localStorage.getItem(dataTableName));
		let allUsers = this.getUsers(dataTableName);
		let isCompareUsers;
		if (allUsers != null && allUsers.hasOwnProperty(userMail) && allUsers[userMail]['e-mail'] == userMail && allUsers[userMail].password == userPassword) {
			isCompareUsers = true;
		} else {
			isCompareUsers = false;
		}
		return isCompareUsers;
	}

	getUsers(dataTableName) {
		let users = JSON.parse(localStorage.getItem(dataTableName));
		return users;
	}

}
