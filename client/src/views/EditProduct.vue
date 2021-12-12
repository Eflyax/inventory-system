<template>
	<v-container>

		<Form
			v-if="product"
			style="border: 1px solid red;padding:20px;"
		>
			<v-text-field
				v-model="product[0].name"
				label="Main input"
				hide-details="auto"
			/>

			<ErrorMessage name="name" />
		</Form>
	</v-container>
</template>

<script lang="ts">
import {useProduct} from '@composables';
import {Field, Form, ErrorMessage} from 'vee-validate';

export const EditProduct = {
	name: 'EditProduct',
	 components: {
		Field,
		Form,
		ErrorMessage,
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
			values: this.product ? this.product[0]: null
		}
	},
	mounted() {
		this.loadProduct(this.$route.params.id);
	}
};

export default EditProduct;
</script>

<style>
input {
	color: white;
}
</style>
