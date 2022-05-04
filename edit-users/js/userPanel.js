import { UsersCards } from "./usersCards.js";
import { MainContent } from "./mainContent.js";
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

		this.usersCards = new UsersCards({
			main: '.page__main',
			users: 'users',
		});


		this.userPanel.addEventListener(this.eventType, (event) => { this.exit(event) });
		this.userPanel.addEventListener(this.eventType, (event) => { this.edit(event) });
		this.userPanel.addEventListener(this.eventType, (event) => { this.back(event) });
	}

	showPanel(mail) {
		this.initialForm.classList.remove(this.initialFormActiveClass);
		this.userPanel.classList.add(this.userPanelActiveCLass);
		this.userPanel.prepend(this.usersCards.currentUser(mail));
	}

	exit(event) {
		if (event.target === this.btnExit) {
			this.initialForm.classList.toggle(this.initialFormActiveClass);
			this.userPanel.classList.toggle(this.userPanelActiveCLass);

			this.mainContent.standart();
			this.btnEdit.classList.remove(this.btnHideClass);
			this.btnBack.classList.add(this.btnHideClass);

			let users = document.querySelector(`.${this.usersCards.usersClass}`);
			let currentUser = this.mainContent.leftColumn.querySelector(`.${this.usersCards.userCard.classUser}`);
			if (users) {
				users.remove();
			}
			currentUser.remove();
		}
	}

	edit(event) {
		if (event.target === this.btnEdit) {
			this.mainContent.leftMiddle(this.usersCards.showUsers());
			this.btnEdit.classList.add(this.btnHideClass);
			this.btnBack.classList.remove(this.btnHideClass);
		}
	}

	back(event) {
		if (event.target === this.btnBack) {

			this.btnEdit.classList.toggle(this.btnHideClass);
			this.btnBack.classList.toggle(this.btnHideClass);
			let users = document.querySelector(`.${this.usersCards.usersClass}`);
			if (users) {
				users.remove();
			}
		}
	}
}

