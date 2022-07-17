import { usersCards } from "./usersCards.js";
import { formEnter } from "../forms/formEnter.js";
import { editForm } from "../forms/formEdit.js";
import { deleteForm } from "../forms/formDelete.js"
import { usersDataLayer } from "../dataLayer/usersDataLayer.js";
import { router } from "../pageTools/router.js";
import { formContainer } from "../forms/formContainer.js";
import { FormAvatar } from '../forms/formAvatar.js';
import { popup } from "../pageTools/popUp.js";

export class UserPanel {
	constructor(options) {
		this.options = options;
		this.userPanel = document.querySelector(options.panel)
		this.initialForm = document.querySelector(options.initialForm);
		this.initialFormActiveClass = options.initialFormActiveClass;
		this.userPanelActiveCLass = options.userPanelActiveCLass;
		this.btnExit = this.userPanel.querySelector(options.btnExit);
		this.btnEdit = this.userPanel.querySelector(options.btnEdit);
		this.btnBack = this.userPanel.querySelector(options.btnBack);
		this.btnHideClass = options.btnHideClass;
		this.eventType = options.eventType;

		this.btnExit.addEventListener(this.eventType, (event) => { this.exit(event) });
		this.btnEdit.addEventListener(this.eventType, (event) => { this.edit(event) });
		this.btnBack.addEventListener(this.eventType, (event) => { this.back(event) });

		if (typeof UserPanel.instance === 'object') {
			return UserPanel.instance;
		}
		UserPanel.instance = this;
		return this;
	}

	async render() {
		const user = formEnter.userData();
		if (!user.email) {
			console.log(user.email);
			this.exit();
			return
		}

		const response = await usersDataLayer.login(user);
		const result = await response.json();

		const status = response.status;
		if (status == 400) {
			alert(result.message);
			return;
		}

		if (!localStorage.getItem('token') && formEnter.checkSubmit) {
			const jwt = {};
			jwt.token = result.token;
			jwt.email = result.email
			const token = await usersDataLayer.createToken(jwt)
			this.initialForm.classList.remove(this.initialFormActiveClass);
			this.userPanel.classList.add(this.userPanelActiveCLass);
		}
		else {
			return;
		}
		await this.showPanel(formEnter.userData()['email']);
		popup.close()
	}

	async showPanel(mail) {
		router.pageTitle();
		this.initialForm.classList.remove(this.initialFormActiveClass);
		this.userPanel.classList.add(this.userPanelActiveCLass);
		let currentUser = await usersCards.currentUser(mail);
		console.log(currentUser);
		if (currentUser.status == 401) {
			router.setLocation('/home');
			return;
		}
		currentUser.classList.add('currentUser');

		this.userPanel.prepend(currentUser);
		let formAvatar = new FormAvatar(
			'avatarForm',
		);
		const formEdit = editForm;
		const formDelete = deleteForm;
	}

	async showCurrentToken() {
		if (localStorage.getItem('token')) {
			router.setLocation('/user');
			let tokenKey = JSON.parse(localStorage.getItem('token'))['email'];
			await this.showPanel(tokenKey);
		} else {
			return;
		}
	}

	exit() {
		formEnter.checkSubmit = false;
		// if (router.parseLcation() == '/home') {
		// 	usersDataLayer.deleteToken();
		// 	return;
		// }
		usersDataLayer.deleteToken();
		router.setLocation('/home');
	}

	edit() {
		router.setLocation('/users');
	}

	back() {
		let users = document.querySelector('.users');
		let user = document.querySelector('.users__user');
		if (users) {
			users.remove();
		}
		router.setLocation('/user');
	}

	showButtonUsers() {
		this.btnEdit.classList.remove(this.btnHideClass);
		this.btnBack.classList.add(this.btnHideClass);
	}
	showButtonBack() {
		this.btnEdit.classList.add(this.btnHideClass);
		this.btnBack.classList.remove(this.btnHideClass);
	}
}


