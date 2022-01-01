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

{{ values }}

			<v-autocomplete
				v-model="values.productToSearch"
				:items="values.filteredProducts"
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
					<v-icon left>
						mdi-bitcoin
					</v-icon>
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
					<v-list-item-action>
						<v-icon>mdi-bitcoin</v-icon>
					</v-list-item-action>
				</template>
			</v-autocomplete
			>


				<my-input
					type="text"
					:label="$t('Odkud')"
				/>

				<!--
				- co
				- typ transakce
				- odkud
				- kam
				- kolik
				-->

			</my-form>
		</v-container>
	</div>
</template>

<script lang="ts">
import Resources from '../utils/Resources';

enum EnumTransaction {
	Sell = 'sell',
	Buy = 'buy',
	Remove = 'remove',
	Move = 'move'
};

export const Transaction = {
	name: "Transaction",
	setup() {
		// const
		// 	{loadUserList, userList, signIn, user, loading} = useUser();

		// loadUserList();

		return {
			// signIn,
			// loadUserList,
			// userList,
			// user,
			// loading
		}
	},
	data() {
		return {
			resources: null,
			values: {
				type: EnumTransaction.Sell,
				productToSearch: '',
				filteredProducts: [],
				loading: false,
				searchInput: null
			}
		};
	},
	watch: {
		'values.searchInput'(value) {
				this.resources.debounce(() => {
					this.searchProduct(value);
				}, 500);
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
		}
	},
	methods: {
		searchProduct(name): void {
			console.log({name});
		}
	},
	mounted() {
		this.resources = new Resources();
		this.values.type = this.$route.name;
	}
};

export default Transaction;
</script>

<style>
.avatar {
	cursor: pointer;
}
</style>
