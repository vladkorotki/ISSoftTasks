import { FormSignIn } from './formEnter.js';
import { FormRegistration } from './formRegistration.js';
// import { FormEdit } from './formEdit.js';
// import { UserPanel } from './userPanel.js';
// import { UserCard } from './userCard.js'
// import { FormContainer } from './formContainer.js';
// import { Popup } from './popUp.js';




const formRegistration = new FormRegistration('regForm');
const formEnter = new FormSignIn({
	id: 'enterForm',
	starterForm: '.initial__form',
	userPanel: '.user__panel',
	exitUserPanel: '.btn--exit',
});

// const formEdit = new FormEdit({
// 	id: 'editForm',
// });


// const user = new UserCard({
// 	classUser: 'users__user',


// 	avatar: {
// 		classBlock: 'user__avatar',
// 		classImg: 'avatar',
// 		srcAttribute: '#url',
// 		altAttribute: 'avatar',
// 	},

// 	userData: {
// 		classUserData: 'user__data',

// 		classUserName: 'user__name',
// 		classUserPhone: 'user__phone',
// 		classUserEmail: 'user__email',
// 		classUserAddress: 'user__address',
// 		classUserGender: 'user__gender',
// 	},

// 	userControls: {
// 		classUserControls: 'user__controls',

// 		classUserBtn: 'btn',
// 		clasUserBtnEdit: 'btn__controls--edit',
// 		classUserBtnDelete: 'btn__controls--delete',
// 		btnTextEdit: 'edit',
// 		btnTextDelete: 'delete',
// 	},

// });

// let userPanel = new UserPanel({
// 	userPanel: '.user__panel',
// 	initialForm: '.initial__form',
// 	btnExit: '.btn--exit',
// 	btnEdit: '.btn--edit',

// 	initialFormActiveClass: 'initial__form--active',
// 	userPanelActiveCLass: 'user__panel--active',
// 	eventType: 'click',
// });





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





