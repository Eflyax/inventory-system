import {reactive, computed} from '@vue/composition-api';
import {useApi} from '../useApi';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

const state = reactive({
	product: null,
	loading: null,
	error: null
});

export const useProduct = () => {
	const
		{sendGet, sendDelete, sendPatch, sendPost} = useApi(),
		loadProduct = async(id = ''): Promise<void> => {
			state.loading = true;
			state.product = await sendGet('product/' + id);
			state.loading = false;
		},
		addProduct = async(values): Promise<void> => {
			state.loading = true;
			state.product = await sendPost('product/', values);
			state.loading = false;
		},
		updateProduct = async(values): Promise<void> => {
			state.loading = true;
			state.product = await sendPatch('product/' + values.id, values);
			state.loading = false;
		},
		deleteProduct = async(id): Promise<void> => {
			state.loading = true;
			await sendDelete('product/' + id);
			await loadProduct();
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
		},
		searchProduct = async(name, inStock = '') => {
			state.loading = true;
			state.product = await sendGet(`product/search?stock=${inStock}&term=${name}`);
			state.loading = false;
		};

	return {
		addProduct,
		loadProduct,
		createProduct,
		updateProduct,
		searchProduct,
		deleteProduct,
		product: computed(() => state.product),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
