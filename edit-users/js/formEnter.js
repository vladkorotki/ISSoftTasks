import { Form } from './form.js';
import { popup } from './popUp.js';
import { usersDataLayer } from './usersDataLayer.js';
// import { UserPanel } from './userPanel.js';
import { panelUser } from './userPanel.js';


export class FormSignIn extends Form {
	constructor(options) {
		super(options.id);
		this.starterForm = document.querySelector(options.starterForm);
		this.userPanel = panelUser;

		// this.userPanel = new UserPanel({
		// 	userPanel: '.user__panel',
		// 	initialForm: '.initial__form',
		// 	btnExit: '.btn--exit',
		// 	btnEdit: '.btn--edit',
		// 	btnBack: '.btn--back',
		// 	btnHideClass: 'btn--hide',
		// 	initialFormActiveClass: 'initial__form--active',
		// 	userPanelActiveCLass: 'user__panel--active',
		// 	eventType: 'click',
		// });

	}

	signIn(event) {
		const compare = usersDataLayer.compareUsers(this.userData()['e-mail'], this.userData().password);
		if (compare) {
			alert('hi');
			this.userPanel.showPanel(this.userData()['e-mail']);
			popup.close(event)
		} else {
			alert('Не верный e-mail или пароль')
		}
	}

	onFormSubmit(event) {
		const submited = super.onFormSubmit(event);
		if (submited) {
			usersDataLayer.addTable(this.dataTableName);
			this.userData();
			this.signIn(event);
		}
	}

	userData() {
		let user = {};
		const inputs = this.inputs;
		for (let i = 0; i < inputs.length; i++) {
			user[inputs[i].name] = inputs[i].value;
		}
		return user;
	}



}

