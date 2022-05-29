export class Router {
	constructor(options) {
		this.routes = options.routes;
		this.location = window.location;
		window.addEventListener('load', () => { window.location.hash = this.routes.currentUser });
		window.addEventListener('hashchange', () => { this.changeRoute() });
	}

	parseLcation() {
		const location = window.location.hash.slice(1) || '/';
		return location;
	}

	changeRoute() {
		let cuurentLocation = this.parseLcation();
		for (let [key, value] of Object.entries(this.routes)) {
			if (cuurentLocation == value) {
				console.log(value);
			}
		}
	}

	changeLocationHash() {

	}
}