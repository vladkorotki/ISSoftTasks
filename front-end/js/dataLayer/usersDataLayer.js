import { DataLayer } from "./dataLayer.js";

export class UsersDataLayer extends DataLayer {
	constructor(options) {
		super(options);
		this.dataTableName = options.dataTableName;
	}

	//Old methods for localStorage
	add(userObject, keyProperty) {
		return super.add(this.dataTableName, userObject, keyProperty);
	}

	addTable() {
		super.addTable(this.dataTableName);
	}

	delete(userObject) {
		return super.delete(this.dataTableName, userObject);
	}

	compareUsers(userMail, userPassword) {
		return super.compareUsers(this.dataTableName, userMail, userPassword);
	}

	allUsers() {
		return super.getUsers(this.dataTableName);
	}

	currentUser(key) {
		console.log(this.allUsers()[key]);
		return this.allUsers()[key];
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

}

export const usersDataLayer = new UsersDataLayer({
	dataTableName: 'Users'
});