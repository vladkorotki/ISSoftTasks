import { FormValidtor } from './validator.js';

export class Form {
	constructor(id) {
		this.form = document.getElementById(id);
		this.errorMessage = this.form.querySelectorAll('.input__error');
		this.inputs = this.form.querySelectorAll(".input");

		this.form.addEventListener('submit', (event) => { this.onFormSubmit(event) });
		this.form.addEventListener('focusin', (event) => { this.focusOnInput(event) });

		this.validator = new FormValidtor(
			{
				'requiered': (value, param) => (value.length === 0),
				'password': (value, param) => !(param.test(value)),
				// 'repeat-password': (value, param) => (value !== param),
				'repeat-password': (value, param) => {
					let repeatValue = document.getElementById(param).value;
					return value !== repeatValue
				},
				'min-length': (value, param) => (value.length < param),
				'max-length': (value, param) => (value.length > param),
				'has-dog': (value, param) => !(param.test(value)),
			}
		);

	}

	focusOnInput(event) {
		if (event.target.closest('.input')) {
			event.target.classList.remove("invalid__input");
			this.errorMessage[+(event.target.dataset.i)].classList.remove("input__error--active");
		}
	}

	onFormSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const isFormValid = this.checkFormValid(form);
		return isFormValid;
	}





	checkInputValid(input) {
		let isValid = true;

		if (input.dataset.validators) {
			const validators = this.validator.createInputValidators(input);
			let value = input.value;
			validators.forEach(validator => {
				if (!this.validator.hasOwnProperty(validator.name)) {
					return;
				}

				if (this.validator[validator.name](value, validator.param)) {
					isValid = false;
				}
				if (isValid === false) {
					input.classList.add("invalid__input");
					this.errorMessage[+(input.dataset.i)].classList.add("input__error--active");
				}
				//  else {
				// 	input.classList.remove("invalid__input");
				// 	input.placeholder = input.name;
				// 	this.errorMessage[+(input.dataset.i)].classList.remove("input__error--active");
				// }
			});
		}
		return isValid;
	}

	checkFormValid() {
		let isValid = true;
		const inputs = this.inputs;
		inputs.forEach(item => {
			// console.log(item.name);
			const isInputValid = this.checkInputValid(item);
			if (!isInputValid) {
				isValid = false;
			}
		});
		return isValid;
	}
}






