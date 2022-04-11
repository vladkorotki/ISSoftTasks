let btnLogin = document.querySelector('.btn--login');
let btnRegistration = document.querySelector('.btn--registration');
let choseFormBtns = document.querySelectorAll('.form__selection .btn');
let forms = document.querySelectorAll('.form');
let registrationContainer = document.querySelector(".form__container--registration");

let popUp = document.querySelector(".pop__up");
let initialContainer = document.querySelector(".initial__popup");

let initialReg = document.querySelector(".registration__fieldset");
let initialEnter = document.querySelector(".enter__fieldset");

let popUpClose = document.querySelector(".pop__up--close");


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


function initialPopup(e) {
	if (e.target === initialReg || e.target === initialEnter) {
		e.preventDefault();
		if (e.target === initialReg) {
			choseFormBtns[0].classList.toggle('btn--active');
			forms[1].classList.toggle("form--active");
			popUp.classList.add("pop__up--active");
		} else if (e.target === initialEnter) {
			choseFormBtns[1].classList.toggle('btn--active');
			forms[0].classList.toggle("form--active");
			popUp.classList.add("pop__up--active");
		} else {
			return;
		}
	}

}

function closePopup(e) {
	e.preventDefault();
	if (e.target === popUpClose) {
		forms.forEach(item => {
			item.classList.remove('form--active');
		})
		choseFormBtns.forEach(item => {
			item.classList.remove('btn--active');
		})
		popUp.classList.remove("pop__up--active");
	}
}


function changingForm(e) {
	if (e.target === btnLogin || e.target === btnRegistration) {
		e.preventDefault();
		forms.forEach(item => {
			item.classList.toggle('form--active');
		})
		choseFormBtns.forEach(item => {
			item.classList.toggle('btn--active');
		})
	}
}

popUpClose.addEventListener('click', closePopup);

initialContainer.addEventListener('click', initialPopup);

registrationContainer.addEventListener('click', changingForm);

