export const fieldTypes = {
	CHECKBOX: 'checkbox',
	DATE: 'date',
	EMAIL: 'email',
	NUMBER: 'number',
	PASSWORD: 'password',
	RADIO: 'radio',
	RATING: 'rating',
	RECAPTCHA: 'recaptcha',
	SELECT: 'select',
	SLIDER: 'slider',
	SUBMIT: 'submit',
	SWITCH: 'switch',
	TEL: 'tel',
	TEXT: 'text',
	TEXTAREA: 'textarea',
	URL: 'url'
};

export function textField(type: string): boolean {
	return [
		fieldTypes.EMAIL,
		fieldTypes.PASSWORD,
		fieldTypes.TEL,
		fieldTypes.TEXT,
		fieldTypes.URL
	].includes(type);
}

export default fieldTypes;
