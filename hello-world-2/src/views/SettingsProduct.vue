<template>
	<v-container>
		<div v-if="productId">
			Úprava produktu
		</div>
		<div v-else>
			<search-product />
		</div>
	</v-container>
</template>

<script lang="ts">
import {useProduct} from '../composables';
import {SearchProduct} from '../components/SearchProduct.vue';

export const SettingsProduct = {
	name: 'SettingsProduct',
	components: {
		SearchProduct
	},
	setup() {
		const {loadProduct} = useProduct();

		return {
			loadProduct
		}
	},
	data() {
		productId: null
	},
	mounted() {
		this.productId = this.$route.params.id;
	}
};

export default SettingsProduct;
</script>
