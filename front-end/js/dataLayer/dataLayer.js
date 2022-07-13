export class DataLayer {
	constructor() {
		if (typeof DataLayer.instance === 'object') {
			return DataLayer.instance;
		}
		DataLayer.instance = this;
		return this;
	}
	//Old methods for localStoage
	addTable(dataTableName) {
		if (!localStorage.getItem(dataTableName)) {
			return localStorage.setItem(dataTableName, JSON.stringify({}));
		}
	}

	add(dataTableName, userObject, keyProperty) {
		this.addTable(dataTableName);
		let allUsers = this.getUsers(dataTableName);
		const mail = userObject[keyProperty];
		allUsers[mail] = userObject;
		localStorage.setItem(dataTableName, JSON.stringify(allUsers));
		return true;
	}

	async createToken(userObject) {
		localStorage.setItem('token', JSON.stringify(userObject));
	}

	deleteToken() {
		localStorage.removeItem('token');
	}

	delete(dataTableName, userObject) {
		let allUsers = this.getUsers(dataTableName);
		delete allUsers[userObject];
		return localStorage.setItem(dataTableName, JSON.stringify(allUsers));
	}

	compareUsers(dataTableName, userMail, userPassword) {
		let allUsers = this.getUsers(dataTableName);
		let isCompareUsers;
		if (allUsers != null && allUsers.hasOwnProperty(userMail) && allUsers[userMail]['email'] == userMail && allUsers[userMail].password == userPassword) {
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

	//New methods for database
	async addUser(user) {
		console.log(JSON.stringify(user));
		const response = await fetch('http://localhost:5501/api/user', {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'POST',
			body: JSON.stringify(user),
		});
		return response;
	}

	async login(user) {
		console.log(JSON.stringify(user));
		const response = await fetch('http://localhost:5501/api', {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'POST',
			body: JSON.stringify(user),
		});
		return response;
	}


	async getNewUsers() {
		const token = JSON.parse(localStorage.getItem('token'));
		console.log(token);
		if (!token) return;
		const response = await fetch(`http://localhost:5501/api/users`, {
			headers: {
				Authorization: 'Bearer ' + token.token,
			}
		});

		const status = await response.status;
		if (status == 401) {
			return response;
		}
		const users = await response.json();
		async function formatUsers(arr) {
			let users = {};
			for (let i = 0; i < arr.length; i++) {
				for (let [key, value] of Object.entries(arr[i])) {
					if (key == ['email']) {
						users[value] = arr[i];
						break;
					} else {
						continue;
					}
				}
			}
			return users
		}
		const allUsers = await formatUsers(users);
		return allUsers;
	}

	async newDelete(id) {
		const deleteUser = await fetch('http://localhost:5501/api', {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'DELETE',
			body: JSON.stringify({ id }),
		});
	}

	async updateUser(user) {
		const response = await fetch('http://localhost:5501/api', {
			headers: {
				"Content-Type": "application/json",
			},
			method: 'PUT',
			body: JSON.stringify(user),
		});
		return response;
	}

	//OLD METHOD
	// async compareNewUsers(userMail, userPassword) {
	// 	let allUsers = await this.getNewUsers();
	// 	let isCompareUsers;
	// 	if (allUsers != null && allUsers.hasOwnProperty(userMail) && allUsers[userMail]['email'] == userMail && allUsers[userMail].password == userPassword) {
	// 		isCompareUsers = true;
	// 	} else {
	// 		isCompareUsers = false;
	// 	}
	// 	return isCompareUsers;
	// }
}