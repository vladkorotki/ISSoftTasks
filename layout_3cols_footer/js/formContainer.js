import { popup } from "./popUp.js";

export class FormContainer {
	constructor(options) {
		this.container = document.getElementById(options.id);
		this.container.buttons = document.querySelectorAll(options.buttons);
		this.container.forms = document.querySelectorAll(options.form);
		this.changeClass = options.changeClass;
		this.classes = options.classes;
		this.hideClass = options.hideClass;
		this.eventType = options.eventType;
		this.registrationFieldset = options.registrationFieldset;
		this.enterFiledset = options.enterFiledset;
		this.container.addEventListener(this.eventType, (e) => { this.changingForm(e) });
		document.addEventListener(this.eventType, (e) => { this.showForm(e) });


	}

	changingForm(e) {
		if (Array.from(this.container.buttons).includes(e.target.closest(this.changeClass))) {
			console.log(this.container.buttons);
			this.container.forms.forEach(item => {
				item.classList.toggle(this.classes[1]);
			})
			this.container.buttons.forEach(item => {
				item.classList.toggle(this.classes[0]);
			})
		}

	}
	showForm(e) {
		if ((e.target.closest(this.registrationFieldset))) {
			this.container.forms[1].classList.toggle(this.classes[1]);
			this.container.buttons[0].classList.toggle(this.classes[0]);
			popup.openPopup(e);
		} else if ((e.target.closest(this.enterFiledset))) {
			this.container.forms[0].classList.toggle(this.classes[1]);
			this.container.buttons[1].classList.toggle(this.classes[0]);
			popup.openPopup(e);
		}
	}

	hideForm(e) {
		this.container.forms.forEach(item => {
			item.classList.remove(this.classes[1]);
		});
		this.container.buttons.forEach(item => {
			item.classList.remove(this.classes[0]);
		})
		console.log(e.target);
	}
}

export const formContainer = new FormContainer({
	id: 'formContainer',
	buttons: '.form__selection .btn',
	form: '.form',
	changeClass: '.btn--change',
	hideClass: '.hide--forms',
	eventType: 'click',
	registrationFieldset: '.registration__fieldset',
	enterFiledset: '.enter__fieldset',
	classes: ['btn--active', 'form--active'],
});


