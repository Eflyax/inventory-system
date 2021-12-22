<template>
	<v-container>
		<my-form
			v-if="values"
			style="margin: 0 auto;"
		>
			<my-input
				label="Název skladu"
				type="text"
				v-model="values.name"
				v-validate="'required'"
			/>

			<v-btn
				class="btn-save"
				color="green"
				@click="submit"
			>
				Uložit
			</v-btn>
		</my-form>
	</v-container>
</template>

<script lang="ts">
import {useStock} from '../composables';

export const EditStock = {
	name: 'EditStock',
	 components: {
	},
	setup() {
		const {stock, loadStock, createStock, addStock, updateStock} = useStock();

		return {
			stock,
			loadStock,
			createStock,
			addStock,
			updateStock
		}
	},
	data() {
		return {
			values: null
		};
	},
	async mounted() {
		if (this.$route.params.id) {
			await this.loadStock(this.$route.params.id);
		}
		else {
			this.createStock();
		}

		this.values = Array.isArray(this.stock) ? this.stock[0] : this.stock;
	},
	methods: {
		async submit() {
			if (await this.$validator.validate()) {
				if (this.values.id) {
					await this.updateStock(this.values);
				}
				else {
					await this.addStock(this.values);
				}
				this.values = this.stock;
			}
			else {
				// showError();
			}
		}
	}
};

export default EditStock;
</script>

<style>
input {
	color: white;
}
</style>
