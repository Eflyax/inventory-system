<template>
	<div class="transaction">
		<v-container>
			<my-form>
				<my-input
					type="select"
					:items="transactionItems"
					:label="$t('Akce')"
					v-model="values.type"
				/>

			<v-autocomplete
				v-model="values.productToSearch"
				:items="product || []"
				:loading="values.loading"
				:search-input.sync="values.searchInput"
				chips
				clearable
				hide-details
				hide-selected
				item-text="name"
				item-value="id"
				:label="$t('Hledat produkt') + '...'"
				solo
			>
				<template v-slot:no-data>
					<v-list-item>
						<v-list-item-title>
							{{ $t('Žádné výsledky')}}
						</v-list-item-title>
					</v-list-item>
				</template>
				<template v-slot:selection="{item}">
					<span v-text="item.name"></span>
				</template>
				<template v-slot:item="{ item }">
					<v-list-item-avatar
						color="indigo"
						class="text-h5 font-weight-light white--text"
					>
						{{ item.name.charAt(0) }}
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-text="item.name"></v-list-item-title>
						<!-- <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle> -->
					</v-list-item-content>
				</template>
			</v-autocomplete
			>

			<template v-if="values.product">
				<span>{{ $t('Varianty')}}</span>

				<div v-if="values.product.variants.length">
					<div
						v-for="(variant, index) in values.product.variants"
						:key="index"
						style="display: flex"
					>
						<span style="width: 100px;">
							{{ variant.name }}
						</span>

						<my-input
							:label="$t('Počet k naskladnění')"
							type="number"
							v-model="variant.quantity"
							v-validate="'required'"
							style="flex: 1"
						/>
					</div>
				</div>
			</template>

			<template v-if="stock">
				<my-input
					v-model="stockDestinationId"
					:label="$t('Naskladnit do') + ':'"
					type="select"
					:items="stockItems"
				/>
			</template>

<pre>
			{{ values }}
</pre>

				<!-- <my-input
					type="text"
					:label="$t('Odkud')"
				/> -->

				<!--
				- co
				- typ transakce
				- odkud
				- kam
				- kolik
				-->
				<v-btn
					class="btn-save"
					color="green"
					@click="submit"
				>
					{{ $t('Uložit') }}
				</v-btn>
			</my-form>
		</v-container>
	</div>
</template>

<script lang="ts">
import Resources from '../utils/Resources';
import {useProduct, useStock, useUser} from '../composables';
import _ from 'lodash';

enum EnumTransaction {
	Sell = 'sell',
	Buy = 'buy',
	Remove = 'remove',
	Move = 'move'
};

export const Transaction = {
	name: "Transaction",
	setup() {
		const
			{product, searchProduct, loading} = useProduct(),
			{stock, loadStock, sell, buy, move, remove} = useStock(),
			{user} = useUser();

		loadStock();

		return {
			stock,
			loadStock,
			product,
			searchProduct,
			loading,
			sell,
			buy,
			move,
			remove,
			user
		};
	},
	data() {
		return {
			resources: null,
			stockDestinationId: null,
			stockSourceId: null,
			values: {
				type: EnumTransaction.Sell,
				productToSearch: '',
				loading: false,
				searchInput: null,
				product: null,
				stockSource: null,
				stockDestination: null
			}
		};
	},
	watch: {
		'values.searchInput'(value) {
				this.resources.debounce(() => {
					this.searchProduct(value);
				}, 500);
		},
		'values.productToSearch'(index) {
			this.values.product = this.product.find(product => product.id == index);
		},
		'stockDestinationId'(index) {
			this.values.stockDestination = this.stock.find(stock => stock.id == index);
		},
		'stockSourceId'(index) {
			this.values.stockSource = this.stock.find(stock => stock.id == index);
		}
	},
	computed: {
		transactionItems() {
			const result = [];

			for (const key in EnumTransaction) {
				result.push({
					text: this.$t('transaction.' + EnumTransaction[key]),
					value: EnumTransaction[key]
				})
			}

			return result;
		},
		stockItems() {
			const result = [];

			for (const key in this.stock) {
				result.push({
					text: this.stock[key].name,
					value: this.stock[key].id
				})
			}

			return result;
		}
	},
	mounted() {
		this.resources = new Resources();
		this.values.type = this.$route.name;
	},
	methods: {
		async submit() {
			console.log('Ukládám');
			if (await this.$validator.validate()) {
				console.log('je to validní');
				console.log('volám typ: ' + this.values.type);


				// movement: {...params.product},
				// author: params.author,
				// stockDestination: params.stockDestination

				_.invoke(this, this.values.type, {
					product:	this.values.product,
					author: this.user,
					stockDestination: this.values.stockDestination
				});

			}
		}
	}
};

export default Transaction;
</script>

<style>
.avatar {
	cursor: pointer;
}
</style>
