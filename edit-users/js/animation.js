// let btnLogin = document.querySelector('.btn--login');
// let btnRegistration = document.querySelector('.btn--registration');
// let choseFormBtns = document.querySelectorAll('.form__selection .btn');
// let forms = document.querySelectorAll('.form');
// let registrationContainer = document.querySelector(".form__container--registration");

// let popUp = document.querySelector(".pop__up");
// let initialContainer = document.querySelector(".initial__popup");

// let initialReg = document.querySelector(".registration__fieldset");
// let initialEnter = document.querySelector(".enter__fieldset");

// let popUpClose = document.querySelector(".popup--close");




// function initialPopup(e) {
// 	if (e.target === initialReg || e.target === initialEnter) {
// 		e.preventDefault();
// 		if (e.target === initialReg) {
// 			choseFormBtns[0].classList.toggle('btn--active');
// 			forms[1].classList.toggle("form--active");
// 			popUp.classList.add("pop__up--active");
// 		} else if (e.target === initialEnter) {
// 			choseFormBtns[1].classList.toggle('btn--active');
// 			forms[0].classList.toggle("form--active");
// 			popUp.classList.add("pop__up--active");
// 		} else {
// 			return;
// 		}
// 	}

// }

// function closePopup(e) {
// 	e.preventDefault();
// 	if (e.target === popUpClose) {
// 		forms.forEach(item => {
// 			item.classList.remove('form--active');
// 		})
// 		choseFormBtns.forEach(item => {
// 			item.classList.remove('btn--active');
// 		})
// 		popUp.classList.remove("pop__up--active");
// 	}
// }


// function changingForm(e) {
// 	if (e.target === btnLogin || e.target === btnRegistration) {
// 		e.preventDefault();
// 		forms.forEach(item => {
// 			item.classList.toggle('form--active');
// 		})
// 		choseFormBtns.forEach(item => {
// 			item.classList.toggle('btn--active');
// 		})
// 	}
// }

// forms.forEach(form => {
// 	form.addEventListener('submit', closePopup);
// });

// popUpClose.addEventListener('click', closePopup);

// initialContainer.addEventListener('click', initialPopup);

// registrationContainer.addEventListener('click', changingForm);


// let buttonExit = document.querySelector('.btn--exit');
// let initialForm = document.querySelector('.initial__form');
// let userCabinet = document.querySelector('.user__panel')

// function userPanelExit(event) {
// 	event.preventDefault(event);

// 	initialForm.classList.toggle('initial__form--active');
// 	userCabinet.classList.toggle('user__panel--active');

// }

// buttonExit.addEventListener('click', userPanelExit);
