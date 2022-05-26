import { popup } from "./popUp.js";
import { editForm } from "./formEdit.js";

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
		this.editFiledset = options.editFiledset;
		this.deleteFiledset = options.deleteFiledset;

		this.formSelectionContainer = document.querySelector(options.selectionContainer);
		this.container.addEventListener(this.eventType, (event) => { this.changingForm(event) });
		document.addEventListener(this.eventType, (event) => { this.showForm(event) });


	}

	changingForm(event) {
		if (Array.from(this.container.buttons).includes(event.target.closest(this.changeClass))) {
			this.changeForm();
		}
	}

	changeForm() {
		this.container.forms.forEach(item => {
			item.classList.toggle(this.classes[1]);
		})
		this.container.buttons.forEach(item => {
			item.classList.toggle(this.classes[0]);
		});
	}


	showForm(event) {

		if ((event.target.closest(this.registrationFieldset))) {
			this.container.forms[1].classList.toggle(this.classes[1]);
			this.container.buttons[0].classList.toggle(this.classes[0]);
			popup.open(event);
		} else if ((event.target.closest(this.enterFiledset))) {
			this.container.forms[0].classList.toggle(this.classes[1]);
			this.container.buttons[1].classList.toggle(this.classes[0]);
			popup.open(event);
		}
		else if ((event.target.closest(this.editFiledset))) {

			this.container.forms[0].classList.add(this.classes[2]);
			this.container.forms[1].classList.add(this.classes[2]);
			this.formSelectionContainer.classList.add(this.classes[2]);
			this.container.forms[2].classList.remove(this.classes[2]);
			editForm.inputsValues();
		}

		else if ((event.target.closest(this.deleteFiledset))) {
			this.container.forms[0].classList.add(this.classes[2]);
			this.container.forms[1].classList.add(this.classes[2]);
			this.formSelectionContainer.classList.add(this.classes[2]);
			this.container.forms[2].classList.add(this.classes[2]);
			this.container.forms[3].classList.remove(this.classes[2]);
		}
	}


	hideForm() {
		this.container.forms.forEach(item => {
			item.classList.remove(this.classes[1]);
		});
		this.container.buttons.forEach(item => {
			item.classList.remove(this.classes[0]);
		});
		this.container.forms[0].classList.remove(this.classes[2]);
		this.container.forms[1].classList.remove(this.classes[2]);
		this.formSelectionContainer.classList.remove(this.classes[2]);
		this.container.forms[2].classList.add(this.classes[2]);
		this.container.forms[3].classList.add(this.classes[2]);
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
	editFiledset: '.btn__controls--edit',
	deleteFiledset: '.btn__controls--delete',
	classes: ['btn--active', 'form--active', 'form--hide'],
	selectionContainer: '.form__selection',
});


