import Vue from 'vue';
import {useApi} from '../useApi';
import {reactive, computed} from '@vue/composition-api';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

const state = reactive({
	stock: null,
	transaction: null,
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
		buy = async(product, author): Promise<void> => {
			state.loading = true;
			await sendPost('stock/transaction/', {
				type: 'buy',
				movement: {...product},
				author: author
			});
			state.loading = false;
		},
		sell = async(product, author): Promise<void> => {
			state.loading = true;
			await sendPost('stock/transaction/', {
				type: 'sell',
				movement: {},
				author: author
			});
			state.loading = false;
		},
		move = async(product, author): Promise<void> => {
			state.loading = true;
			await sendPost('stock/transaction/', {
				type: 'move',
				movement: {},
				author: author
			});
			state.loading = false;
		},
		remove = async(product, author): Promise<void> => {
			state.loading = true;
			await sendPost('stock/transaction/', {
				type: 'remove',
				movement: {},
				author: author
			});
			state.loading = false;
		},
		loadTransaction = async() => {
			state.loading = true;
			state.transaction = await sendGet('stock/transaction/');
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
		buy,
		sell,
		move,
		remove,
		loadTransaction,
		transaction: computed(() => state.transaction),
		stock: computed(() => state.stock),
		loading: computed(() => state.loading),
		error: computed(() => state.error)
	};
};
