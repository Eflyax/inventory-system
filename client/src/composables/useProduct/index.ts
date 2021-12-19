import {reactive, computed} from '@vue/composition-api';

const state = reactive({
	product: null,
	loading: null,
	error: null
});

export const useProduct = () => {
	const
		loadProduct = async(id = ''): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'product/' + id, {method: 'GET'})
				.then(response => response.json())
				.then(data => {
					state.product = data.result
				});

			state.loading = false;
		},
		addProduct = async(values): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'product/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})
				.then(response => response.json())
				.then(data => {
					state.product = data.result
				});

			state.loading = false;
		},
		updateProduct = async(values): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'product/' + values.id, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})
				.then(response => response.json())
				.then(data => {
					state.product = data.result
				});

			state.loading = false;
		},
		deleteProduct = async(id): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'product/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(() => loadProduct());

			state.loading = false;
		},
		createProduct = () => {
			state.product = {
				id: null,
				name: '',
				price: {
					price: 0,
					purchasePrice: 0
				},
				icon: '',
				variants: [],
				quantity: 0
			};
		};

	return {
		addProduct,
		loadProduct,
		createProduct,
		updateProduct,
		deleteProduct,
		product: computed(() => state.product),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
