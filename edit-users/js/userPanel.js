import { UsersCards } from "./usersCards.js";
import { MainContent } from "./mainContent.js";
export class UserPanel {
	constructor(options) {

		this.userPanel = document.querySelector(options.userPanel);
		this.initialForm = document.querySelector(options.initialForm);

		this.btnExit = document.querySelector(options.btnExit);
		this.btnEdit = document.querySelector(options.btnEdit);

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
	}

	showPanel(mail) {
		this.initialForm.classList.remove(this.initialFormActiveClass);
		this.userPanel.classList.add(this.userPanelActiveCLass);
		// this.userPanel.prepend(this.usersCards.userCard.createUserCard());
		this.userPanel.prepend(this.usersCards.currentUser(mail));
		// this.usersCards.currentUser(mail);
	}

	exit(event) {
		if (event.target === this.btnExit) {
			this.initialForm.classList.toggle(this.initialFormActiveClass);
			this.userPanel.classList.toggle(this.userPanelActiveCLass);
			this.mainContent.standart(this.usersCards.usersClass, this.usersCards.userCard.classUser);
		}
	}

	edit(event) {
		if (event.target === this.btnEdit) {
			this.mainContent.leftMiddle(this.usersCards.showUsers())
		}
	}


}

// let userPanel = new UserPanel({
// 	userPanel: 'user__panel',
// 	initialForm: 'initial__form',
// 	btnExit: 'btn--exit',
// 	btnEdit: 'btn--edit',

// 	initialFormActiveClass: 'initial__form--active',
// 	userPanelActiveCLass: 'user__panel--active',
// 	eventType: 'click',
// });
