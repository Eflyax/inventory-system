import {reactive, computed} from '@vue/composition-api';

const state = reactive({
	product: null,
	loading: null,
	error: null
});

export const useProduct = () => {
	const
		loadProduct = async(id?: number): Promise<void> => {
			state.loading = true;

			fetch(process.env.VUE_APP_API_URL + 'product/' + id, {method: 'get'})
				.then(response => response.json())
				.then(data => {
					state.product = data.result
				});

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
		loadProduct,
		createProduct,
		product: computed(() => state.product),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
