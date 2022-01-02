<template>
	<div class="transactions">
		<v-container>
			<ul>
				<li v-for="(item, index) in transaction" :key="index">
					{{ item.type }} - {{ getDate(item.date) }}
				</li>
			</ul>
		</v-container>
	</div>
</template>

<script lang="ts">
import {useStock} from '../composables';

export const Transactions = {
	name: 'Transactions',
	setup() {
		const
			{transaction, stock, loading, loadTransaction} = useStock();

		loadTransaction();

		return {
			stock,
			loading,
			loadTransaction,
			transaction
		}
	},
	data() {
		return {
		}
	},
	methods: {
		getDate(foo) {
			var date = new Date(foo);

			return (date.getDay() + 1) + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getUTCHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
		}
	}
};

export default Transactions;
</script>
