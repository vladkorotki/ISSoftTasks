import { DataLayer } from "./dataLayer.js";

export class UsersDataLayer extends DataLayer {
	constructor(options) {
		super(options);
		this.dataTableName = options.dataTableName;
	}

	addTable() {
		super.addTable(this.dataTableName);
	}

	add(userObject, keyProperty) {
		return super.add(this.dataTableName, userObject, keyProperty);
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

	curentUser(key) {
		return this.allUsers()[key];
	}

}

export const usersDataLayer = new UsersDataLayer({
	dataTableName: 'Users'
});