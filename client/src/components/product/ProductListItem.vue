<template>
	<v-row>
		<v-col cols="9">{{ product.name }}
			<template v-if="product.variants">
				<v-chip
					v-for="(variant, index) in product.variants"
					color="dark"
					:key="index"
				>
					{{ variant.name }}
				</v-chip>
			</template>
		</v-col>

		<v-col cols="3">
			<v-btn
				:to="'/settings/product/edit/' + product.id"
				color="primary"
			>
				<v-icon color="blue">mdi-pencil</v-icon>
			</v-btn>
			<v-btn
				@click="deleteProduct(product.id)"
				color="red"
			>
				<v-icon color="red">mdi-delete</v-icon>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import {useProduct} from '@composables';

export const ProductListItem = {
	name: 'ProductListItem',
	props: {
		product: Object
	},
	setup() {
		const {deleteProduct} = useProduct();

		return {
			deleteProduct
		}
	}
};

export default ProductListItem;
</script>
