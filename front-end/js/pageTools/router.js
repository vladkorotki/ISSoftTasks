import { panelUser } from "../usersBuild/userPanel.js";
import { formSignIn } from "../forms/formEnter.js";
export class Router {
	constructor() {
		// this.routes = options.routes;
		this.routes = {
			// '/': panelUser.back(),
			'/user': '',
			'/users': '',
			'/error': '',
		};



		this.location = window.location;
		window.addEventListener('load', () => { window.location.hash = this.routes.currentUser });
		// window.addEventListener('load', () => { this.pageTitle() });
		window.addEventListener('hashchange', () => { this.changeRoute() });
	}

	pageTitle() {
		let title = document.querySelector('title');
		console.log((title));
		title.textContent = window.location.hash;
	}


	setLocation(hash) {
		window.location.hash = hash;
		this.pageTitle();
	}

	parseLcation() {
		const location = window.location.hash.slice(1) || '/';
		return location;
	}

	changeRoute() {
		let cuurentLocation = this.parseLcation();
		// formSignIn.render();
		for (let [key, value] of Object.entries(this.routes)) {
			if (cuurentLocation == key) {
				formSignIn.render()
				break;
				// console.log(value);
				// return value;
			} else {
				continue;
			}
		}
	}

	changeLocationHash() {

	}
}

export const router = new Router();