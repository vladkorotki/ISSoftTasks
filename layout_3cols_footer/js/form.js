import { FormValidtor } from './validator.js';

export class Form {
	constructor(id) {
		this.form = document.getElementById(id);
		this.form.addEventListener('submit', (e) => { this.onFormSubmit(e) });
		this.errorMessage = this.form.querySelectorAll('.input__error');
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

	onFormSubmit(e) {
		e.preventDefault();
		console.log(this);
		const form = e.target;
		let isFormValid = this.checkFormValid(form);
		console.log(isFormValid);
		if (isFormValid) {
			console.log('form is valid');
		} else {
			console.log('form is Not valid');
			return;
		}
	}

	checkInputValid(input) {
		let isValid = true;

		if (input.dataset.validators) {
			let validators = this.validator.createInputValidators(input);
			let value = input.value;
			validators.forEach(validator => {
				if (!this.validator.hasOwnProperty(validator.name)) {
					console.log('Нет такого свойства');
					return;
				}
				console.log(this.validator[validator.name](value, validator.param));
				if (this.validator[validator.name](value, validator.param)) {
					isValid = false;
				}
				if (isValid === false) {
					input.classList.add("invalid__input");
					this.errorMessage[+(input.dataset.i)].classList.add("input__error--active");

				} else {
					input.classList.remove("invalid__input");
					input.placeholder = input.name;
					this.errorMessage[+(input.dataset.i)].classList.remove("input__error--active");
				}
			});
		}
		return isValid;
	}

	checkFormValid() {
		let isValid = true;
		const inputs = this.form.querySelectorAll(".input");
		inputs.forEach(item => {
			let isInputValid = this.checkInputValid(item);
			if (!isInputValid) {
				isValid = false;
			}
		});
		return isValid;
	}
}






