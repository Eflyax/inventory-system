import Vue from 'vue';
import {useApi} from '../useApi';
import {reactive, computed} from '@vue/composition-api';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

const state = reactive({
	stock: null,
	loading: null,
	error: null
});

export const useStock = () => {
	const
		{sendGet, sendDelete, sendPatch, sendPost} = useApi(),
		loadStock = async(id = ''): Promise<void> => {
			state.loading = true;
			state.stock = await sendGet('stock/' + id);
			state.loading = false;
		},
		addStock = async(values): Promise<void> => {
			state.loading = true;
			state.stock = await sendPost('stock/', values);
			state.loading = false;
		},
		updateStock = async(values): Promise<void> => {
			state.loading = true;
			state.stock = await sendPatch('stock/' + values.id, values);
			state.loading = false;
		},
		deleteStock = async(id): Promise<void> => {
			state.loading = true;
			await sendDelete('stock/' + id);
			await loadStock();
			state.loading = false;
		},
		createStock = () => {
			state.stock = {
				id: null,
				name: '',
				icon: '',
				color: ''
			};
		};

	return {
		addStock,
		loadStock,
		createStock,
		updateStock,
		deleteStock,
		stock: computed(() => state.stock),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
