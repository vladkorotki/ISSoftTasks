import { DataLayer } from "./dataLayer.js";

export class UsersDataLayer extends DataLayer {
	constructor(options) {
		super(options);
		this.dataTableName = options.dataTableName;
	}

	add(userObject, keyProperty) {
		super.add(this.dataTableName, userObject, keyProperty);
	}

	compareUsers(userMail, userPassword) {
		return super.compareUsers(this.dataTableName, userMail, userPassword);
	}
}

export const usersDataLayer = new UsersDataLayer({
	dataTableName: 'Users'
});