import { usersCards } from "./usersCards.js";
import { formEnter } from "../forms/formEnter.js";
import { editForm } from "../forms/formEdit.js";
import { deleteForm } from "../forms/formDelete.js"
import { usersDataLayer } from "../dataLayer/usersDataLayer.js";
import { router } from "../pageTools/router.js";
import { formContainer } from "../forms/formContainer.js";

export class UserPanel {
	constructor(options) {
		this.options = options;

		// this.template = document.getElementById(options.id);
		// this.userPanel = this.template.content.querySelector(options.panel)
		this.userPanel = document.querySelector(options.panel)
		this.initialForm = document.querySelector(options.initialForm);

		this.initialFormActiveClass = options.initialFormActiveClass;
		this.userPanelActiveCLass = options.userPanelActiveCLass;
		this.btnExit = this.userPanel.querySelector(options.btnExit);
		this.btnEdit = this.userPanel.querySelector(options.btnEdit);
		this.btnBack = this.userPanel.querySelector(options.btnBack);

		// this.btnExit = document.querySelector(options.btnExit);
		// this.btnEdit = document.querySelector(options.btnEdit);
		// this.btnBack = document.querySelector(options.btnBack);
		this.btnHideClass = options.btnHideClass;


		this.eventType = options.eventType;


		// window.addEventListener('load', () => { this.showCurrentToken() });

		this.btnExit.addEventListener(this.eventType, (event) => { this.exit(event) });
		this.btnEdit.addEventListener(this.eventType, (event) => { this.edit(event) });
		this.btnBack.addEventListener(this.eventType, (event) => { this.back(event) });

		if (typeof UserPanel.instance === 'object') {
			return UserPanel.instance;
		}
		UserPanel.instance = this;
		return this;
	}

	render() {
		if (!localStorage.getItem('token') && formEnter.checkSubmit) {
			usersDataLayer.createToken(formEnter.userData());
			this.initialForm.classList.remove(this.initialFormActiveClass);
			this.userPanel.classList.add(this.userPanelActiveCLass);
		} else {
			return;
		}

		this.showPanel(formEnter.userData()['e-mail']);

		// this.initialForm.classList.remove(this.initialFormActiveClass);
		// this.userPanel.classList.add(this.userPanelActiveCLass);
		// usersDataLayer.createToken(formEnter.userData());
	}

	showPanel(mail) {

		router.pageTitle()

		this.initialForm.classList.remove(this.initialFormActiveClass);
		this.userPanel.classList.add(this.userPanelActiveCLass);
		let currentUser = usersCards.currentUser(mail);
		currentUser.classList.add('currentUser');


		this.userPanel.prepend(currentUser);
		const formEdit = editForm;
		const formDelete = deleteForm;
	}

	showCurrentToken() {
		if (localStorage.getItem('token')) {
			router.setLocation('/user');
			let tokenKey = JSON.parse(localStorage.getItem('token'))['e-mail'];
			this.showPanel(tokenKey);
		} else {
			return;
		}
	}

	exit() {
		formEnter.checkSubmit = false;

		if (router.parseLcation() == '/home') {
			usersDataLayer.deleteToken();
			return
		}
		usersDataLayer.deleteToken();
		router.setLocation('/home');
		console.log(window.location.hash);

		// this.initialForm.classList.toggle(this.initialFormActiveClass);
		// this.userPanel.classList.toggle(this.userPanelActiveCLass);
		// // this.mainContent.standart();
		// this.btnEdit.classList.remove(this.btnHideClass);
		// this.btnBack.classList.add(this.btnHideClass);

	}

	edit() {

		router.setLocation('/users')
		// this.mainContent.leftMiddle(usersCards.showUsers());
		// this.btnEdit.classList.add(this.btnHideClass);
		// this.btnBack.classList.remove(this.btnHideClass);

	}

	back(event) {
		// this.btnEdit.classList.remove(this.btnHideClass);
		// this.btnBack.classList.add(this.btnHideClass);
		// 
		// this.btnEdit.classList.toggle(this.btnHideClass);
		// this.btnBack.classList.toggle(this.btnHideClass);
		let users = document.querySelector('.users');
		let user = document.querySelector('.users__user');
		if (users) {
			users.remove();
		}
		router.setLocation('/user');
	}

	showButtonUsers() {
		this.btnEdit.classList.remove(this.btnHideClass);
		this.btnBack.classList.add(this.btnHideClass);
	}
	showButtonBack() {
		this.btnEdit.classList.add(this.btnHideClass);
		this.btnBack.classList.remove(this.btnHideClass);
	}


	// updateCards() {
	// 	let users = document.querySelector('.users');
	// 	if (users) {
	// 		users.remove();
	// 		this.mainContent.leftMiddle(usersCards.showUsers());
	// 	}

	// }



	// updateCurrentCard(mail) {
	// 	let currentUser = this.mainContent.leftColumn.querySelector('.users__user');
	// 	if (currentUser.dataset.key == mail) {
	// 		currentUser.remove();
	// 		this.userPanel.prepend(usersCards.currentUser(mail));
	// 	}
	// }


}


// export const panelUser = new UserPanel(
// 	{
// 		id: 'userPanel',
// 		panel: '.user__panel',

// 		userPanel: '.user__panel',
// 		initialForm: '.initial__form',
// 		btnExit: '.btn--exit',
// 		btnEdit: '.btn--edit',
// 		btnBack: '.btn--back',
// 		btnHideClass: 'btn--hide',
// 		initialFormActiveClass: 'initial__form--active',
// 		userPanelActiveCLass: 'user__panel--active',
// 		eventType: 'click',
// 	}
// );
