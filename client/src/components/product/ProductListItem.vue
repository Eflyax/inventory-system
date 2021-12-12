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
			<v-btn>
				<v-icon color="blue">mdi-pencil</v-icon>
			</v-btn>
			<v-btn>
				<v-icon color="red">mdi-delete</v-icon>
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
export const ProductListItem = {
	name: 'ProductListItem',
	props: {
		product: Object
	}
};

export default ProductListItem;
</script>
