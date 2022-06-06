import { usersCards } from "../usersBuild/usersCards.js";
import { MainContent } from "./mainContent.js";
import { usersDataLayer } from "../dataLayer/usersDataLayer.js";
import { UserPanel } from "../usersBuild/userPanel.js";
import { formContainer } from "../forms/formContainer.js";
import { popup } from "./popUp.js";

export class Router {
	constructor(options) {


		this.mainContent = new MainContent({
			main: '.page__main',
			cols: '.section__column',
			leftColumn: '.section__column--left',
			middleColumn: '.section__column--middle',
			rightColumn: '.section__column--right',
			columnHideClass: 'section__column--hide',
		});


		this.routes = {
			'/home': () => this.home(),
			'/user': () => this.user(),
			'/users': () => this.users(),
			'/error': '',
		};



		this.location = this.parseLcation();

		window.addEventListener('load', () => { this.mainContent.panelUser.showCurrentToken() });

		window.addEventListener('hashchange', () => { this.pageTitle() });
		window.addEventListener('hashchange', () => { this.changeRoute() });
		if (typeof Router.instance === 'object') {
			return Router.instance;
		}
		Router.instance = this;
		return this;
	}

	pageTitle() {
		let title = document.querySelector('title');
		title.textContent = this.parseLcation().slice(1);
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
		let users = document.querySelector('.users');
		if (users) {
			users.remove();
		}
		let cuurentLocation = this.parseLcation();
		if (!this.routes.hasOwnProperty(cuurentLocation)) {
			alert('error');
			router.setLocation(this.location);
			return this.routes[this.location]();
		}
		return this.routes[cuurentLocation]();
	}

	user() {
		console.log('user');


		let users = document.querySelector('.users');
		if (users) {
			users.remove();
		}
		this.mainContent.panelUser.render();
		this.mainContent.panelUser.showButtonUsers();
		if (!(localStorage.getItem('token'))) {
			this.home();
			formContainer.enter()
		}

		this.location = this.parseLcation();

	}

	home() {
		console.log('home');
		this.mainContent.panelUser.initialForm.classList.add(this.mainContent.panelUser.initialFormActiveClass);
		this.mainContent.panelUser.userPanel.classList.remove(this.mainContent.panelUser.userPanelActiveCLass);

		this.mainContent.panelUser.btnEdit.classList.remove(this.mainContent.panelUser.btnHideClass);
		this.mainContent.panelUser.btnBack.classList.add(this.mainContent.panelUser.btnHideClass);

		this.mainContent.panelUser.exit()
		this.mainContent.standart();
		let users = document.querySelector('.users');
		let currentUser = this.mainContent.leftColumn.querySelector('.users__user');

		if (users) {
			users.remove();
		}
		if (currentUser) {
			currentUser.remove();
		}
		this.location = this.parseLcation();
	}

	users(event) {
		if (!(localStorage.getItem('token'))) {
			this.home();
			formContainer.enter()
		}

		this.mainContent.leftMiddle(this.mainContent.usersCards.showUsers());
		this.mainContent.panelUser.showButtonBack();
		this.location = this.parseLcation();
	}

}

export const router = new Router();

