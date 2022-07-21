import { DataLayer } from "./dataLayer.js";

export class UsersDataLayer extends DataLayer {
	constructor(options) {
		super(options);
		this.dataTableName = options.dataTableName;
	}


	//New methods for database
	async addUser(user) {
		return await super.addUser(user);
	}

	async login(user) {
		return await super.login(user)
	}

	async currentNewUser(key) {
		const users = await this.allNewUsers();
		const user = users[key];
		return user;
	}

	async allNewUsers() {
		return await super.getNewUsers();
	}

	async getUser(email) {
		return await super.getUser(email);
	}

	async newDelete(id) {
		return await super.newDelete(id);
	}

	async updateUser(user) {
		return await super.updateUser(user);
	}

	async compareNewUsers(userMail, userPassword) {
		return await super.compareNewUsers(userMail, userPassword);
	}

	async uploadAvatar(form, key) {
		return await super.uploadAvatar(form, key);
	}

}

export const usersDataLayer = new UsersDataLayer({
	dataTableName: 'Users'
});