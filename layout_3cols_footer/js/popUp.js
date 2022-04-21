
import { formContainer } from "./formContainer.js";
export class Popup {
	constructor(options) {
		this.popUp = document.getElementById(options.id);
		this.popUpClose = options.popUpClose;
		this.popUpOpen = options.popUpOpen;
		this.eventType = options.eventType;
		this.classForActivePopup = options.classForActivePopup;
		this.popUp.close = document.querySelector(options.popUpClose);
		document.addEventListener(this.eventType, (e) => { this.openPopup(e) });
		this.popUp.close.addEventListener(this.eventType, (e) => { this.closePopup(e) });
	}



	closePopup(e) {
		if (e.target.closest(this.popUpClose)) {
			this.popUp.classList.remove(this.classForActivePopup);
			formContainer.hideForm(e);
		} else {
			this.popUp.classList.remove(this.classForActivePopup);
			formContainer.hideForm(e);
		}



	}

	openPopup(e) {
		if (e.target.closest(this.popUpOpen)) {
			this.popUp.classList.add(this.classForActivePopup);
		}
	}


	// popupContent(e) {

	// }
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
