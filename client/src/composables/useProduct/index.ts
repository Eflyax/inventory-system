import {reactive, computed} from 'vue';

const state = reactive({
	product: null,
	loading: null,
	error: null
});

export const useProduct = () => {
	const
		loadProduct = async(id?: number): Promise<void> => {
			state.loading = true;

			fetch(process.env.API_URL + 'product', {method: 'get'})
				.then(response => response.json())
				.then(data => {
					state.product = data.result
				});

			state.loading = false;
		};

	return {
		loadProduct,
		product: computed(() => state.product),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
