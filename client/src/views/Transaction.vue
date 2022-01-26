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
			</v-autocomplete>

			<template v-if="stock && stockItems.length">
				<my-input
					v-if="values.type === 'move' || values.type === 'remove' || values.type === 'sell'"
					v-model="stockSourceId"
					:label="labelStockSource"
					type="select"
					:items="stockItems"
					v-validate="'required'"
				/>
				<span v-else>{{ $t('Tento produkt není nikde skladem') }}</span>

				<my-input
					v-if="values.type === 'buy' || values.type === 'move'"
					v-model="stockDestinationId"
					:label="labelStockDestination"
					type="select"
					:items="stockItems"
					v-validate="'required'"
				/>
			</template>

			<template v-if="values.product && stockItems.length">
				<span>{{ $t('Varianty')}}</span>

				<div v-if="productVariants.length">
					<div
						v-for="(variant, index) in productVariants"
						:key="'v' + index"
						style="display: flex"
					>
						<span style="width: 100px;">
							{{ variant.name }}<br>
							<span v-if="values.type !== 'buy'">
								{{ $t('Skladem {count} ks', {count: variant.maxQuantity}) }}
							</span>
						</span>

						<my-input
							:key="'vi' + index"
							:label="labelForVariantQuantity + ' ('+ variant.name +')'"
							type="number"
							v-model="variant.quantity"
							v-validate="'required|min_value:0'"
							style="flex: 1"
						/>
						<!-- v-validate="'required|min_value:0|max_value:' + variant.maxQuantity" -->
					</div>
				</div>
			</template>

			<template v-if="values.type === 'sell'">
				<my-input
					v-model="values.priceType"
					:label="$t('Typ ceny')"
					type='radio'
					:items="[{
						label: $t('Standardní cena'),
						value: 'price'
					}, {
						label: $t('Nákupní cena'),
						value: 'purchasePrice'
					}]"
					v-validate="'required'"
				/>
			</template>
productVariants: <br>
<pre>
{{productVariants}}
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
			productVariants: [],
			values: {
				type: EnumTransaction.Sell,
				productToSearch: '',
				loading: false,
				searchInput: null,
				product: null,
				stockSource: null,
				stockDestination: null,
				priceType: 'price'
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

			this.values.product.variants.map(variant => {
				variant.maxQuantity = (Math.max() * -1);
				variant.quantity = 0;
			});

			this.productVariants = this.values.product.variants;
		},
		'stockSourceId'(index) {
			this.values.stockSource = this.stock.find(stock => stock.id == index);

			if (this.values.type != 'buy') {
				const product =  this.values.stockSource.content.find(item => item.id == this.values.product.id);

				product.variants.map(variant => {
					variant.maxQuantity = variant.quantity;
					variant.quantity = 0;
				});

				this.productVariants = product.variants;
			}
		}
	},
	computed: {
		labelForVariantQuantity(): string {
			switch(this.values.type) {
				case EnumTransaction.Buy:
					return this.$t('Počet k naskladnění');
				case EnumTransaction.Sell:
					return this.$t('Počet k odepsání');
				case EnumTransaction.Move:
					return this.$t('Počet k přesunutí');
				case EnumTransaction.Remove:
					return this.$t('Počet k odstranění');
			}
		},
		labelStockSource(): string {
			switch(this.values.type) {
				case EnumTransaction.Buy:
					return '';
				case EnumTransaction.Sell:
					return this.$t('Odepsat ze skladu');
				case EnumTransaction.Move:
					return this.$t('Přesunout ze skladu');
				case EnumTransaction.Remove:
					return this.$t('Odstranit ze skladu');
			}
		},
		labelStockDestination(): string {
			switch(this.values.type) {
				case EnumTransaction.Buy:
					return this.$t('Naskladnit do skladu');
				case EnumTransaction.Sell:
					return '';
				case EnumTransaction.Move:
					return this.$t('Přesunout do skladu');
				case EnumTransaction.Remove:
					return '';
			}
		},
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

			let stocks = this.stock;

			// if (this.values.product && this.values.type !== 'buy') {
			// 	let filteredStocks = [];

			// 	stocks.forEach(stock => {
			// 		const containedInContent = stock.content.find(item => item.id == this.values.product.id)

			// 		if (containedInContent) {
			// 			filteredStocks.push(stock);
			// 		}
			// 	});

			// 	stocks = filteredStocks;
			// }

			for (const key in stocks) {
				result.push({
					text: stocks[key].name,
					value: stocks[key].id
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
			this.values.product.variants = this.productVariants;

			console.log({valud: await this.$validator.validate()});

			if (await this.$validator.validate()) {
				// send_
				_.invoke(this, this.values.type, {
					product:	this.values.product,
					author: this.user,
					stockSourceId: this.stockSourceId,
					stockDestinationId: this.stockDestinationId,
					priceType: this.values.priceType
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
