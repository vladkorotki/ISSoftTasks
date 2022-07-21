import { usersDataLayer } from '../dataLayer/usersDataLayer.js';
import { Form } from './form.js';
import { mainContent } from '../pageTools/mainContent.js';
export class FormAvatar extends Form {
	constructor(id) {
		super(id)
		this.form = document.getElementById(id);
		this.form.addEventListener('click', (event) => { this.findKey(event) });
		this.key;
		this.input = this.form.querySelector('.input__file');
		this.inputFileChoose();
	}

	inputFileChoose() {
		const label = this.input.nextElementSibling;
		const labelVal = label.querySelector('.input__file-button-text').innerText;
		this.input.addEventListener('change', function () {
			let countFiles = '';
			if (this.files && this.files.length >= 1) {
				countFiles = this.files.length;
			}

			if (countFiles) {
				label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
			}

			else {
				label.querySelector('.input__file-button-text').innerText = labelVal;
			}
		});
	}

	async onFormSubmit(event) {
		event.preventDefault();
		const currentCard = document.querySelector(`.currentUser`);
		const img = currentCard.querySelector('img');
		const avatar = await usersDataLayer.uploadAvatar(this.form, this.key);
		img.src = avatar;
		await mainContent.updateCurrentCard(this.key);
		await mainContent.updateCards();
	}

	findKey(event) {
		if (event.target.hasAttribute('data-key')) {
			this.key = event.target.dataset.key;
			return this.key;
		}
	}
}


