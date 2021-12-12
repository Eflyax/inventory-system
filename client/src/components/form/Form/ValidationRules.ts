import {Validator, RuleValidate} from 'vee-validate';

type ValidationResult = {
	valid: boolean;
	data: {message: string};
} | Promise<ValidationResult>;

export class ValidationRules {

	ruleSet;

	constructor() {

		this.ruleSet = {
			checked: (value = ''): ValidationResult => {
				return {
					valid: value.toString() === 'true',
					data: {
						message: 'This input is required'
					}
				};
			},
			email: (value = ''): ValidationResult => {
				return {
					valid: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(value),
					data: {
						message: 'E-mail value has wrong format'
					}
				};
			},
			max: (value = '', maxLength: number): ValidationResult => {
				return {
					valid: value.length <= maxLength,
					data: {
						message: 'Length must be less than {value}'
					}
				};
			},
			min: (value = '', minLength: number): ValidationResult => {
				return {
					valid: value.length >= minLength,
					data: {
						message: 'Length must be greater than {value}'
					}
				};
			}
		};
	}

	init = (): void => {
		for (const validationName in this.ruleSet) {
			Validator.extend(validationName, {
				validate: this.ruleSet[validationName] as RuleValidate,
				getMessage: (field, param, data) => data.message
			});
		}
	}
}

export default ValidationRules;
