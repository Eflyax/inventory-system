<template>
	<div class="transactions">
		<v-container>
			<ul>
				<li v-for="(item, index) in transaction" :key="index">
					<b>{{ getDate(item.date) }}</b> - {{ item.author.name}} -
					{{ $t('transactionAction.' + item.type, {woman: item.author.male ? '' : 'a'}) }} -

					{{ item.movement.name }}

					<template v-for="(variant, index) in item.movement.variants">
						<span :key="index" v-if="variant.quantity">
							<v-chip>{{ variant.quantity }}x {{ variant.name }}</v-chip>
						</span>
					</template>
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
		getDate(isoDate) {
			const
				parts = isoDate.split('T'),
				dateParts = parts[0].split('-'),
				year = dateParts[0],
				month = dateParts[1],
				day = dateParts[2],
				hours = parts[1].split('.')[0];

			return day + '.' + month + '.' + year + ' ' + hours;
		}
	}
};

export default Transactions;
</script>
