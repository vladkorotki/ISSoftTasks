let btnLogin = document.querySelector('.btn--login');
let btnRegistration = document.querySelector('.btn--registration');
let choseFormBtns = document.querySelectorAll('.form__selection .btn');
let fildsets = document.querySelectorAll('.fieldset');
let registrationContainer = document.querySelector(".form__container--registration");

// class Animation {
// 	constructor(options) {
// 		this.login = options.login;
// 		this.registration = options.registration;
// 		this.choseForm = options.choseForm;
// 		this.typeForm = options.typeForm;
// 		this.formContainer = options.formContainer;
// 	}

// 	changingForm(e) {
// 		if (e.target === this.login || e.target === this.registration) {
// 			e.preventDefault();
// 			this.typeForm.forEach(item => {
// 				item.classList.toggle('fieldset--active');
// 			});
// 			this.choseForm.forEach(item => {
// 				item.classList.toggle('btn--active');
// 			});
// 		}
// 	}

// 	runChange() {
// 		this.formContainer.addEventListener('click', this.changingForm)
// 	}

// }

// let animation = new Animation({
// 	login: btnLogin,
// 	registration: btnRegistration,
// 	choseForm: choseFormBtns,
// 	typeForm: fildsets,
// 	formContainer: registrationContainer,
// });


// animation.runChange()





function changingForm(e) {
	if (e.target === btnLogin || e.target === btnRegistration) {
		e.preventDefault();
		fildsets.forEach(item => {
			item.classList.toggle('fieldset--active');
		})
		choseFormBtns.forEach(item => {
			item.classList.toggle('btn--active');
		})
	}
}

registrationContainer.addEventListener('click', changingForm);

