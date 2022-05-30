import { FormSignIn } from './forms/formEnter.js';
import { FormRegistration } from './forms/formRegistration.js';
// import { Router } from './pageTools/router.js';
// import { User } from './pageComponents/user.js';
// import { Users } from './pageComponents/users.js';



const formRegistration = new FormRegistration('regForm');
const formEnter = new FormSignIn({
	id: 'enterForm',
	starterForm: '.initial__form',
	userPanel: '.user__panel',
	exitUserPanel: '.btn--exit',
});
// const router = new Router();
// const router = new Router({
// 	routes: {
// 		home: '/',
// 		currentUser: '/user',
// 		users: '/users',
// 		error: '/error',
// 	},
// });


// const user = new User({
// 	id: "userComponent",
// 	user: ".users__user",
// });

// const users = new Users({
// 	id: "usersComponent",
// 	users: ".users",
// })





