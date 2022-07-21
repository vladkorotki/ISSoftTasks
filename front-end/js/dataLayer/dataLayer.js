export class DataLayer {
	constructor() {
		if (typeof DataLayer.instance === 'object') {
			return DataLayer.instance;
		}
		DataLayer.instance = this;
		return this;
	}

	async createToken(userObject) {
		localStorage.setItem('token', JSON.stringify(userObject));
	}

	deleteToken() {
		localStorage.removeItem('token');
	}

	async addUser(user) {
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

		if (!token) return;
		const response = await fetch(`http://localhost:5501/api/users`, {
			headers: {
				Authorization: 'Bearer ' + token.token,
			}
		});

		const users = await response.json();
		const status = response.status;

		if (status == 401) {
			alert(users.message);
			return response;
		}

		async function formatUsers(arr) {
			let users = {};

			for (let i = 0; i < arr.length; i++) {

				for (let [key, value] of Object.entries(arr[i])) {

					if (key == ['email']) {
						users[value] = arr[i];
						break;
					}

					else {
						continue;
					}
				}
			}
			return users
		}
		const allUsers = await formatUsers(users);
		return allUsers;
	}

	async getUser(email) {
		const token = JSON.parse(localStorage.getItem('token'));

		if (!token) return;
		const response = await fetch(`http://localhost:5501/api/user`, {
			headers: {
				Authorization: 'Bearer ' + token.token,
				email: email,
			}
		});

		const user = await response.json();
		const status = response.status;

		if (status == 401) {
			alert(user.message);
			return response;
		}

		return user;
	}

	async newDelete(id) {
		const token = JSON.parse(localStorage.getItem('token'));
		const deleteUser = await fetch('http://localhost:5501/api', {
			headers: {
				"Content-Type": "application/json",
				Authorization: 'Bearer ' + token.token,
			},
			method: 'DELETE',
			body: JSON.stringify({ id }),
		});
		return deleteUser;
	}

	async updateUser(user) {
		const token = JSON.parse(localStorage.getItem('token'));
		const response = await fetch('http://localhost:5501/api', {
			headers: {
				"Content-Type": "application/json",
				Authorization: 'Bearer ' + token.token,
			},
			method: 'PUT',
			body: JSON.stringify(user),
		});
		return response;
	}

	async uploadAvatar(form, key) {
		const response = await fetch('http://localhost:5501/api/avatar', {
			headers: {
				key,
			},
			method: 'POST',
			body: new FormData(form),
		});
		return await response.json();
	}
}