<template>
	<div>
		<v-btn
			to="/settings/product/edit"
			color="green"
		>
			<v-icon color="white">mdi-plus-circle-outline</v-icon>
			<span>{{ $t('Přidat') }}</span>
		</v-btn>

		<hr>

		<product-list-item
			v-for="(productItem, index) in product"
			:product="productItem"
			:key="index"
		/>
	</div>
</template>

<script>
import {useProduct} from '@composables';
import {ProductListItem} from './product/ProductListItem.vue';

export const SearchProduct = {
	name: 'SearchProduct',
	components: {
		ProductListItem
	},
	setup() {
		const {loadProduct, product, loading, error} = useProduct();

		loadProduct();

		return {
			loadProduct,
			product,
			loading,
			error
		};
	}
};

export default SearchProduct;
</script>
