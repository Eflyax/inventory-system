import _ from 'lodash';
import {textField} from './../MyInput/fieldTypes';
// import ValidationRules from './ValidationRules';

export const MyForm = {
	name: 'MyForm',
	props: {
		scope: String,
		autofocus: Boolean
	},
	// setup() {
	// 	const
	// 		// validationRules = new ValidationRules({});

	// 	validationRules.init();

	// 	return {
	// 		recaptcha: false
	// 	};
	// },
	mounted() {
		this.$nextTick(() => {
			if (this.autofocus) {
				this.focusInput(this);
			}
		});
	},
	methods: {
		focusInput(vueComponent: Vue): void {
			const component = vueComponent.$children.find(vueComponent => vueComponent['_name'] === '<Input>');

			if (component) {
				const
					inputElement = component.$children[0]?.$el;

				if (inputElement) {
					const input = inputElement.getElementsByTagName('input');

					if (input[0] && textField(input[0].getAttribute('type'))) {
						_.invoke(input[0], 'focus');
					}
				}
			}
			else {
				vueComponent.$children.forEach(childVueComponent => {
					this.focusInput(childVueComponent);
				});
			}
		},
		onSubmit(e: KeyboardEvent): void {
			e.preventDefault();

			const form = this.$children.find(vueComponent => vueComponent._vnode.tag === 'form');

			this.submitForm(form);
		},
		submitForm(vueComponent: Vue): void {
			const submitButton = vueComponent.$children.find(vueComponent => vueComponent.$attrs.submit !== undefined);

			if (submitButton) {
				_.invoke(submitButton.$el, 'click');
			}
			else {
				vueComponent.$children.forEach(childVueComponent => {
					this.submitForm(childVueComponent);
				});
			}
		}
	}
};

export default MyForm;
