<template>
	<v-container>
		<v-btn
			to="/settings/stock/edit"
			color="green"
		>
			<v-icon color="white">mdi-plus-circle-outline</v-icon>
			<span>Přidat</span>
		</v-btn>

		<hr>

		<stock-list-item
			v-for="(stockItem, index) in stock"
			:stock="stockItem"
			:key="index"
		/>
	</v-container>
</template>

<script lang="ts">
import {useStock} from '../composables';
import {StockListItem} from '../components/stock/StockListItem.vue';

export const SettingsStock = {
	name: 'SettingsStock',
	components: {
		StockListItem
	},
	setup() {
		const {loadStock, stock, error, loading} = useStock();

		return {
			loadStock,
			stock
		};
	},
	mounted() {
		this.loadStock();
	}
};

export default SettingsStock;
</script>
