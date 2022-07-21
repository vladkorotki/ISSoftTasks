import { formContainer } from "../forms/formContainer.js";

export class Popup {
	constructor(options) {
		this.popUp = document.getElementById(options.id);
		this.popUpClose = options.popUpClose;
		this.popUpOpen = options.popUpOpen;
		this.eventType = options.eventType;
		this.classForActivePopup = options.classForActivePopup;
		this.popUp.close = document.querySelector(options.popUpClose);
		document.addEventListener(this.eventType, (event) => { this.open(event) });
		this.popUp.close.addEventListener(this.eventType, (event) => { this.close(event) });
		if (typeof Popup.instance === 'object') {
			return Popup.instance;
		}
		Popup.instance = this;
		return this;
	}

	close(event) {
		this.popUp.classList.remove(this.classForActivePopup);
		formContainer.hideForm(event);
	}

	open(event) {
		if (event.target.closest(this.popUpOpen)) {
			this.popUp.classList.add(this.classForActivePopup);
		}
	}

	openOnHashChange() {
		this.popUp.classList.add(this.classForActivePopup);
	}
}

export const popup = new Popup({
	id: 'popUp',
	popUpOpen: '.popup--open',
	popUpClose: ".close__popup",
	initialForm: '.initial__form',
	userPanel: '.user__panel',
	eventType: 'click',
	classForActivePopup: 'pop__up--active',
});
