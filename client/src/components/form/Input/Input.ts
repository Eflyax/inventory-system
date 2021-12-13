import {textField} from './fieldTypes';
import fieldTypes from './fieldTypes';

export const Input = {
	name: 'Input',
	inject: ['form'],
	props: {
		disabled: Boolean,
		hint: String,
		label: String,
		prependInnerIcon: String,
		autocomplete: {
			type: String,
			default: 'on'
		},
		clearable: Boolean,
		value: undefined,
		radioGroup: undefined,
		checked: Boolean,
		multiple: Boolean,
		loading: Boolean,
		validationRulesSource: undefined,
		validations: String,
		fixedLabel: Boolean,
		type: {
			type: String,
			default: fieldTypes.TEXT,
			validator: value => {
				const result = Object.values(fieldTypes).indexOf(value) >= 0;

				if (!result) {
					console.error('Type: ' + value + ' is not supported');
				}

				return result;
			}
		},
		items: {
			type: Array,
			default: () => []
		}
	},
	// setup() {
	// 	// const {config} = useConfig();
	// 	return {
	// 		// recaptchaEnabled: config.recaptcha.enabled
	// 	};
	// },
	data() {
		return {
			fieldTypes: fieldTypes,
			showPicker: false,
			showIcon: false,
			internalValue: null,
			parentValidationRule: undefined,
			rules: null,
			scope: undefined // set in "mounted" by injected form
		};
	},
	computed: {
		appendIcon(): string {
			if (this.type === this.fieldTypes.PASSWORD) {
				return this.showIcon ? 'mdi-eye' : 'mdi-eye-off';
			}
		},
		textField(): boolean {
			return textField(this.type);
		},
		name(): string {
			return this.label;
		},
		errorMessage(): string {
			return '';
			// const error = this.$parent?.errors.items
			// 	.find(error => error.field === this.name && error.scope == this.scope);

			// if (error) {
			// 	return error.msg;
			// }
		},
		required(): boolean {
			return false;

			// if (this.validationRulesSource
			// 	&& Array.isArray(this.validationRulesSource)
			// 	&& this.validationRulesSource.includes('required')) {
			// 	return true;
			// }
			// else if (this.$vnode?.data.directives) {
			// 	const validationRules = this.$vnode?.data.directives.find(directive => {
			// 		return directive.rawName === 'v-validate';
			// 	});

			// 	if (validationRules && validationRules.value) {
			// 		this.rules = validationRules.value;
			// 		this.parentValidationRule = validationRules.value;

			// 		if (typeof validationRules.value === 'string') {
			// 			return validationRules.value.includes('required');
			// 		}
			// 		else if (Array.isArray(validationRules.value) && validationRules.value.includes('required')) {
			// 			return true;
			// 		}
			// 		else {
			// 			return validationRules.value['required'];
			// 		}
			// 	}
			// }
		}
	},
	methods: {
		incrementValue(): void {
			this.updateValue(parseInt(this.value) + 1);
		},
		decrementValue(): void {
			this.updateValue(parseInt(this.value) - 1);
		},
		updateValue(newValue: string | number | boolean): void {
			const error = null; //this.$parent?.errors.items.find(error => error.field === this.name);
			let emitEvent;

			if (error) {
				this.errors.removeById(error.id);
			}

			switch (this.type) {
				case fieldTypes.CHECKBOX:
				case fieldTypes.SWITCH:
					newValue = !this.value;
					emitEvent = 'input';
					break;
				case fieldTypes.NUMBER:
					emitEvent = 'input';
					newValue = Number(newValue);
					break;
				default:
					emitEvent = 'change';
			}

			this.showPicker = false;
			this.$emit(emitEvent, newValue);
		},
		onLabelClick(): void {
			this.$refs.input.focus();
		}
	},
	mounted(): void {
		this.scope = this.form ? this.form.$attrs['data-vv-scope'] : undefined;

		if (this.type === fieldTypes.RECAPTCHA) {
			this.$emit('change', '_');
		}
	},
	$_veeValidate: {
		name(): string {
			return this.label;
		},
		value(): string {
			return this.value;
		}
	}
};

export default Input;
