import {computed} from '@vue/composition-api';
import {sharedRef} from '@vue-storefront/core';

export const useProduct = () => {
	const
		product = sharedRef(null, 'useProduct-product'),
		loading = sharedRef(null, 'useProduct-loading'),
		error = sharedRef(null, 'useProduct-error'),
		loadProduct = async(id?: number): Promise<void> => {
			loading.value = true;

			fetch(process.env.API_URL + 'product/' + id, {method: 'get'})
				.then(response => response.json())
				.then(data => {
					product.value = data.result
				});

			loading.value = false;
		};

	return {
		loadProduct,
		product,
		loading: computed(() => loading.value),
		error: computed(() => error.value)
	};
};
