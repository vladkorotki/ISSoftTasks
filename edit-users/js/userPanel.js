import { usersCards } from "./usersCards.js";
import { MainContent } from "./mainContent.js";
import { editForm } from "./formEdit.js";
import { deleteForm } from "./formDelete.js"
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

		// this.usersCards = new UsersCards({
		// 	main: '.page__main',
		// 	users: 'users',
		// });


		this.userPanel.addEventListener(this.eventType, (event) => { this.exit(event) });
		this.userPanel.addEventListener(this.eventType, (event) => { this.edit(event) });
		this.userPanel.addEventListener(this.eventType, (event) => { this.back(event) });


		if (typeof UserPanel.instance === 'object') {
			return UserPanel.instance;
		}
		UserPanel.instance = this;
		return this;
	}

	showPanel(mail, event) {
		this.initialForm.classList.remove(this.initialFormActiveClass);
		this.userPanel.classList.add(this.userPanelActiveCLass);
		this.userPanel.prepend(usersCards.currentUser(mail));
		// const formEdit = new FormEdit({
		// 	id: 'editForm',
		// });

		const formEdit = editForm;
		const formDelete = deleteForm;
		console.log(event.target);
		if (event.target.closest('.form--enter')) {
			formEdit.submitBtn.classList.add('currentBtn');

			let removeClass = function () {
				if (formEdit.editOk) {
					formEdit.submitBtn.classList.remove('currentBtn');
				}
			};
			formEdit.form.addEventListener('submit', removeClass);
		}
	}



	exit(event) {

		if (event.target === this.btnExit) {
			this.initialForm.classList.toggle(this.initialFormActiveClass);
			this.userPanel.classList.toggle(this.userPanelActiveCLass);

			this.mainContent.standart();
			this.btnEdit.classList.remove(this.btnHideClass);
			this.btnBack.classList.add(this.btnHideClass);

			let users = document.querySelector(`.${usersCards.usersClass}`);
			let currentUser = this.mainContent.leftColumn.querySelector(`.${usersCards.userCard.classUser}`);
			console.log(currentUser);
			if (users) {
				users.remove();
			}
			currentUser.remove();
		}
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

