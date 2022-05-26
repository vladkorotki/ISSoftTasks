import { usersCards } from "./usersCards.js";
import { MainContent } from "../pageTools/mainContent.js";
import { editForm } from "../forms/formEdit.js";
import { deleteForm } from "../forms/formDelete.js"
import { usersDataLayer } from "../dataLayer/usersDataLayer.js";
export class UserPanel {
	constructor(options) {

		this.userPanel = document.querySelector(options.userPanel);
		this.initialForm = document.querySelector(options.initialForm);

		this.btnExit = document.querySelector(options.btnExit);
		this.btnEdit = document.querySelector(options.btnEdit);
		this.btnBack = document.querySelector(options.btnBack);
		this.btnHideClass = options.btnHideClass;

		this.initialFormActiveClass = options.initialFormActiveClass;
		this.userPanelActiveCLass = options.userPanelActiveCLass;
		this.eventType = options.eventType;
		this.mainContent = new MainContent({
			main: '.page__main',
			cols: '.section__column',
			leftColumn: '.section__column--left',
			middleColumn: '.section__column--middle',
			rightColumn: '.section__column--right',
			columnHideClass: 'section__column--hide',
		});

		window.addEventListener('DOMContentLoaded', () => { this.showCurrentToken() });

		this.btnExit.addEventListener(this.eventType, (event) => { this.exit(event) });
		this.userPanel.addEventListener(this.eventType, (event) => { this.edit(event) });
		this.userPanel.addEventListener(this.eventType, (event) => { this.back(event) });

		if (typeof UserPanel.instance === 'object') {
			return UserPanel.instance;
		}
		UserPanel.instance = this;
		return this;
	}



	showPanel(mail) {
		let currentUser = usersCards.currentUser(mail);
		currentUser.classList.add('currentUser');
		this.initialForm.classList.remove(this.initialFormActiveClass);
		this.userPanel.classList.add(this.userPanelActiveCLass);
		this.userPanel.prepend(currentUser);


		const formEdit = editForm;
		const formDelete = deleteForm;

	}

	showCurrentToken() {
		if (localStorage.getItem('token')) {
			let tokenKey = JSON.parse(localStorage.getItem('token'))['e-mail'];
			this.showPanel(tokenKey);
		} else {
			return;
		}
	}

	exit() {

		this.initialForm.classList.toggle(this.initialFormActiveClass);
		this.userPanel.classList.toggle(this.userPanelActiveCLass);

		this.mainContent.standart();
		this.btnEdit.classList.remove(this.btnHideClass);
		this.btnBack.classList.add(this.btnHideClass);

		let users = document.querySelector(`.${usersCards.usersClass}`);
		let currentUser = this.mainContent.leftColumn.querySelector(`.${usersCards.userCard.classUser}`);

		usersDataLayer.deleteToken();
		if (users) {
			users.remove();
		}
		currentUser.remove();

	}

	edit(event) {
		if (event.target === this.btnEdit) {
			this.mainContent.leftMiddle(usersCards.showUsers());
			this.btnEdit.classList.add(this.btnHideClass);
			this.btnBack.classList.remove(this.btnHideClass);
		}
	}

	back(event) {
		if (event.target === this.btnBack) {
			this.btnEdit.classList.toggle(this.btnHideClass);
			this.btnBack.classList.toggle(this.btnHideClass);
			let users = document.querySelector(`.${usersCards.usersClass}`);
			if (users) {
				users.remove();
			}
		}
	}

	updateCards() {
		let users = document.querySelector(`.${usersCards.usersClass}`);
		if (users) {
			users.remove();
			this.mainContent.leftMiddle(usersCards.showUsers());
		}

	}



	updateCurrentCard(mail) {
		let currentUser = this.mainContent.leftColumn.querySelector(`.${usersCards.userCard.classUser}`);
		if (currentUser.dataset.key == mail) {
			currentUser.remove();
			this.userPanel.prepend(usersCards.currentUser(mail));
		}
	}


}


export const panelUser = new UserPanel({
	userPanel: '.user__panel',
	initialForm: '.initial__form',
	btnExit: '.btn--exit',
	btnEdit: '.btn--edit',
	btnBack: '.btn--back',
	btnHideClass: 'btn--hide',
	initialFormActiveClass: 'initial__form--active',
	userPanelActiveCLass: 'user__panel--active',
	eventType: 'click',
});

