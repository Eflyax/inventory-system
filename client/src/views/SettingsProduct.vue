<template>
	<v-container>
		<search-product />
	</v-container>
</template>

<script lang="ts">
import {SearchProduct} from '../components/SearchProduct.vue';

export const SettingsProduct = {
	name: 'SettingsProduct',
	components: {
		SearchProduct
	}
};

export default SettingsProduct;
</script>
