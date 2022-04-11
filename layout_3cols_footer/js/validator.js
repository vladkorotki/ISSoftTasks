
// this.rules = {
// 	'requiered': (value, param) => (value.length === 0),
// 	'password': (value, param) => !(param.test(value)),
// 	'repeat-password': (value, param) => {
// 		let repeatValue = document.getElementById(param).value;
// 		return value !== repeatValue
// 	},
// 	'min-length': (value, param) => (value.length < param),
// 	'max-length': (value, param) => (value.length > param),
// 	'has-dog': (value, param) => !(param.test(value)),
// }

export class FormValidtor {
	constructor(options) {
		this['requiered'] = options['requiered'];
		this['password'] = options['password'];
		this['repeat-password'] = options['repeat-password'];
		this['min-length'] = options['min-length'];
		this['max-length'] = options['max-length'];
		this['has-dog'] = options['has-dog'];

	}
	createInputValidators(input) {
		let validators = [];
		const emailRegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		const passwordErgExp = /.*([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+).*/;
		input.dataset.validators.split(', ').map(validator => {
			let validatorStr = validator.trim();
			let name = validatorStr.split('(')[0];
			let param = validatorStr.split(/[()]/)[1];
			validators.push({
				name,
				param,
			});
		});

		validators = validators.map(validator => {
			if (validator.name === 'has-dog') {
				validator.param = emailRegExp;
			}
			if (validator.name === 'password') {
				validator.param = passwordErgExp;
			}
			// if (validator.name === 'repeat-password') {
			// 	validator.param = document.getElementById('pass').value;
			// }
			return validator;
		});
		console.log(validators);
		return validators;
	}



}