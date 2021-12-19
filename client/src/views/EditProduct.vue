<template>
	<v-container>
		<my-form
			v-if="values"
			style="margin: 0 auto;"
		>
			<my-input
				label="Název produktu"
				type="text"
				v-model="values.name"
				v-validate="'required'"
			/>

			<my-input
				label="Cena"
				type="number"
				v-model="values.price.price"
				v-validate="'required'"
			/>

			<my-input
				label="Nákupní cena"
				type="number"
				v-model="values.price.purchasePrice"
				v-validate="'required'"
			/>

			<span>Varianty</span>

			<div v-if="values.variants.length">
				<div
					v-for="(variant, index) in values.variants"
					:key="index"
					style="display: flex"
				>
					<my-input
						label="Název varianty"
						type="text"
						v-model="variant.name"
						v-validate="'required'"
						style="flex: 1"
					/>
					<v-btn
						class="btn-remove"
						color="red"
						small
						@click="removeVariant(index)"
					>
						<v-icon>delete</v-icon>
					</v-btn>
				</div>
			</div>
			<p v-else>
				Produkt nemá žádné varianty
			</p>

			<v-btn
				color="primary"
				small
				@click="addVariant"
			>
				+
			</v-btn>

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
import {useProduct} from '../composables';

export const EditProduct = {
	name: 'EditProduct',
	 components: {
	},
	setup() {
		const {product, loadProduct, createProduct, addProduct, updateProduct} = useProduct();

		return {
			product,
			loadProduct,
			createProduct,
			addProduct,
			updateProduct
		}
	},
	data() {
		return {
			values: null
		};
	},
	async mounted() {
		if (this.$route.params.id) {
			await this.loadProduct(this.$route.params.id);
		}
		else {
			this.createProduct();
		}

		this.values = Array.isArray(this.product) ? this.product[0] : this.product;
	},
	methods: {
		addVariant() {
			this.values.variants.push({
				name: '',
				quantity: 0
			});
		},
		removeVariant(index) {
			this.values.variants.splice(index, 1);
		},
		async submit() {
			if (await this.$validator.validate()) {
				if (this.values.id) {
					await this.updateProduct(this.values);
				}
				else {
					await this.addProduct(this.values);
				}
				console.log({'hotovo': this.product});
				this.values = this.product;
			}
			else {
				// showError();
			}
		}
	}
};

export default EditProduct;
</script>

<style>
input {
	color: white;
}
</style>
