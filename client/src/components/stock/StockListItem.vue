<template>
	<v-row>
		<v-col cols="9">
			{{ stock.name }}
		</v-col>

		<v-col cols="3">
			<v-btn
				:to="'/settings/stock/edit/' + stock.id"
				color="primary"
			>
				<v-icon>mdi-pencil-outline</v-icon>
			</v-btn>
			<v-btn
				@click="deleteStock(stock.id)"
				color="red"
			>
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import {useStock} from '@composables';

export const StockListItem = {
	name: 'StockListItem',
	props: {
		stock: Object
	},
	setup() {
		const {deleteStock} = useStock();

		return {
			deleteStock
		}
	}
};

export default StockListItem;
</script>
