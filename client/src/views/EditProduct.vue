<template>
	<v-container>
		{{product}}
		<my-form
			v-if="values"
			style="border: 1px solid red;padding:20px;"
		>
			<my-input
				label="Název porduktu"
				type="text"
				v-model="values.name"
				v-validate="'required'"
			/>

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
		const {product, loadProduct, createProduct} = useProduct();

		return {
			product,
			loadProduct,
			createProduct
		}
	},
	data() {
		return {
			values: this.product ? this.product[0]: null
		}
	},
	mounted() {
		if (this.$route.params.id) {
			this.loadProduct(this.$route.params.id);
		}
		else {
			this.createProduct();
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
