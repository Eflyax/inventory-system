import Vue from 'vue';
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
		loadStock = async(id = ''): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'stock/' + id, {method: 'GET'})
				.then(response => response.json())
				.then(data => {
					state.stock = data.result
				});

			state.loading = false;
		},
		addStock = async(values): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'stock/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})
				.then(response => response.json())
				.then(data => {
					state.stock = data.result
				});

			state.loading = false;
		},
		updateStock = async(values): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'stock/' + values.id, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})
				.then(response => response.json())
				.then(data => {
					state.stock = data.result
				});

			state.loading = false;
		},
		deleteStock = async(id): Promise<void> => {
			state.loading = true;

			await fetch(process.env.VUE_APP_API_URL + 'stock/' + id, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(() => loadStock());

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
