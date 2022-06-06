
// import { Home } from "../pageComponents/home.js";
import { UserPanel } from "../usersBuild/userPanel.js";
import { usersCards } from "../usersBuild/usersCards.js";


export class MainContent {
	constructor(options) {
		this.main = document.querySelector(options.main);
		this.cols = document.querySelectorAll(options.cols);
		this.leftColumn = document.querySelector(options.leftColumn);
		this.middleColumn = document.querySelector(options.middleColumn);
		this.rightColumn = document.querySelector(options.rightColumn);
		this.columnHideClass = options.columnHideClass;




		// this.home = new Home({
		// 	id: "initialPopup",
		// 	initPopup: ".initial__popup"
		// });

		this.panelUser = new UserPanel(
			{
				id: 'userPanel',
				panel: '.user__panel',

				userPanel: '.user__panel',
				initialForm: '.initial__form',
				btnExit: '.btn--exit',
				btnEdit: '.btn--edit',
				btnBack: '.btn--back',
				btnHideClass: 'btn--hide',
				initialFormActiveClass: 'initial__form--active',
				userPanelActiveCLass: 'user__panel--active',
				eventType: 'click',
			}
		);

		this.usersCards = usersCards;

	}




	updateCards() {
		let users = document.querySelector('.users');
		if (users) {
			users.remove();
			this.leftMiddle(usersCards.showUsers());
		}

	}



	updateCurrentCard(mail) {
		let currentUser = this.leftColumn.querySelector('.users__user');
		if (currentUser.dataset.key == mail) {
			currentUser.remove();
			this.panelUser.userPanel.prepend(usersCards.currentUser(mail));
		}
	}






	leftMiddle(content) {
		this.rightColumn.classList.add(this.columnHideClass);
		this.middleColumn.style.flexGrow = '2';
		this.middleColumn.append(content);
	}

	standart() {

		this.cols.forEach(item => {
			item.classList.remove(this.columnHideClass);
		});
		this.middleColumn.style.flexGrow = '1';
	}

	left(content) {
		this.leftColumn.append(content);
	}




}


export const mainContent = new MainContent({
	main: '.page__main',
	cols: '.section__column',
	leftColumn: '.section__column--left',
	middleColumn: '.section__column--middle',
	rightColumn: '.section__column--right',
	columnHideClass: 'section__column--hide',
});
