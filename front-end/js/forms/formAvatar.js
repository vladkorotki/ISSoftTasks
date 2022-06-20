import { Form } from './form.js';
export class FormAvatar extends Form {
	constructor(id) {
		console.log('load formAvatar class');
		super(id)
		this.form = document.getElementById(id);
		this.inputs = this.form.querySelectorAll('.input__file');
		this.inputFileChoose();
	}

	inputFileChoose() {
		Array.prototype.forEach.call(this.inputs, function (input) {
			let label = input.nextElementSibling,
				labelVal = label.querySelector('.input__file-button-text').innerText;

			input.addEventListener('change', function (e) {
				let countFiles = '';
				if (this.files && this.files.length >= 1)
					countFiles = this.files.length;

				if (countFiles)
					label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
				else
					label.querySelector('.input__file-button-text').innerText = labelVal;
			});
		});

	}

	async onFormSubmit(event) {
		event.preventDefault();
		console.log(this.form);
		await fetch('http://localhost:5501/', {
			method: 'POST',
			body: new FormData(this.form),

		});
	}

	log() {
		console.log(this.form);
	}
}



