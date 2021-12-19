<template>
	<v-container>

		<Form
			style="border: 1px solid red;padding:20px;"
		>
			<Input
				type="text"
				v-model="foo"
				validations="'required'"
			/>

		</Form>
	</v-container>
</template>

<script lang="ts">
import {useProduct} from '../composables';

export const EditProduct = {
	name: 'EditProduct',
	 components: {
	},
	setup() {
		const {product, loadProduct} = useProduct();

		return {
			product,
			loadProduct
		}
	},
	data() {
		return {
			foo: 'bar',
			values: this.product ? this.product[0]: null
		}
	},
	mounted() {
		// this.loadProduct(this.$route.params.id);
	}
};

export default EditProduct;
</script>

<style>
input {
	color: white;
}
</style>
