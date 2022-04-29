import { FormSignIn } from './formEnter.js';
import { FormRegistration } from './formRegistration.js';
import { UserCard } from './userCard.js'
// import { FormContainer } from './formContainer.js';
// import { Popup } from './popUp.js';




const formRegistration = new FormRegistration('regForm');
const formEnter = new FormSignIn({
	id: 'enterForm',
	starterForm: '.initial__form',
	userPanel: '.user__panel',
	exitUserPanel: '.btn--exit',
});

const user = new UserCard();
console.log(user.createUserCard());



// let formContainer = new FormContainer({
// 	id: 'formContainer',
// 	buttons: '.form__selection .btn',
// 	form: '.form',
// 	changeClass: '.btn--change',
// 	hideClass: '.hide--forms',
// 	eventType: 'click',
// 	registrationFieldset: '.registration__fieldset',
// 	enterFiledset: '.enter__fieldset',
// 	classes: ['btn--active', 'form--active'],
// });

// let popup = new Popup({
// 	id: 'popUp',
// 	popUpOpen: '.popup--open',
// 	popUpClose: ".close__popup",
// 	initialForm: '.initial__form',
// 	userPanel: '.user__panel',
// 	eventType: 'click',
// 	classForActivePopup: 'pop__up--active',
// });





