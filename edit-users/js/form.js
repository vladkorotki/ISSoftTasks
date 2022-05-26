export class Form {
	constructor(id) {
		this.form = document.getElementById(id);
		this.errorMessage = this.form.querySelectorAll('.input__error');
		this.inputs = this.form.querySelectorAll(".input");

		this.form.addEventListener('submit', (event) => { this.onFormSubmit(event) });
		this.form.addEventListener('focusin', (event) => { this.focusOnInput(event) });

	}

	focusOnInput(event) {
		if (event.target.closest('.input') && event.target.classList.contains('invalid__input')) {
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
		let validators = false;

		if (input.hasAttribute('data-validators')) {
			validators = JSON.parse(input.dataset.validators);
		}

		let isValid = true;

		if (validators) {
			for (let [key, value] of Object.entries(validators)) {

				if (key == 'requiered' && input.value.length == 0) {
					input.classList.add("invalid__input");
					this.errorMessage[+(input.dataset.i)].textContent = value;
					this.errorMessage[+(input.dataset.i)].classList.add("input__error--active");
					isValid = false;
					break;
				}
				else if (input.value.length !== 0 && key == 'minLength' && input.value.length < value || key == 'maxLength' && input.value.length > value) {
					input.classList.add("invalid__input");
					this.errorMessage[+(input.dataset.i)].textContent = validators.errorMessage[0];
					this.errorMessage[+(input.dataset.i)].classList.add("input__error--active");
					isValid = false;
					break;
				}
				else if (key == 'regexp' && input.value.length > 0) {
					let reg = new RegExp(value);
					if (!reg.test(input.value)) {
						input.classList.add("invalid__input");
						if (input.type == 'tel' || input.type == 'email') {
							this.errorMessage[+(input.dataset.i)].textContent = validators.errorMessage[0];
						}
						else { this.errorMessage[+(input.dataset.i)].textContent = validators.errorMessage[1]; }

						this.errorMessage[+(input.dataset.i)].classList.add("input__error--active");
						isValid = false;
						break;
					}
				}
				else if (input.name == 'repeat-password') {
					let password = this.form.querySelector('.input-password').value;
					let repeatPassword = input.value;
					if (password !== repeatPassword) {
						input.classList.add("invalid__input");
						this.errorMessage[+(input.dataset.i)].textContent = validators.errorMessage[2];
						this.errorMessage[+(input.dataset.i)].classList.add("input__error--active");
						isValid = false;
					}
				}
				else {
					continue;
				}

			}
		}

		return isValid;
	}

	checkFormValid() {
		let isValid = true;
		const inputs = this.inputs;
		inputs.forEach(item => {

			const isInputValid = this.checkInputValid(item);
			if (!isInputValid) {
				isValid = false;
			}
		});
		return isValid;
	}
}






