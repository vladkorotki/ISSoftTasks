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

	compareUsers(userMail, userPassword) {
		return super.compareUsers(this.dataTableName, userMail, userPassword);
	}

	allUsers() {
		return super.getUsers(this.dataTableName);
	}

}

export const usersDataLayer = new UsersDataLayer({
	dataTableName: 'Users'
});