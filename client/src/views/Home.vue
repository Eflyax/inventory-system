<template>
	<v-container>
		<h3>Produkt</h3>
		<v-row no-gutters>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-minus-circle-multiple</v-icon>
					<p>Odepsat položku</p>
				</v-card>
			</v-col>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-plus-circle-multiple</v-icon>
					<p>Naskladnit položku</p>
				</v-card>
			</v-col>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-arrow-right-top</v-icon>
					<p>Přesunout položku</p>
				</v-card>
			</v-col>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-delete-empty</v-icon>
					<p>Odstranit položku</p>
				</v-card>
			</v-col>
		</v-row>

		<h3>Sklad</h3>
		<v-row no-gutters>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-minus-circle-multiple</v-icon>
					<p>Odepsat položku</p>
				</v-card>
			</v-col>
		</v-row>

		<h3>Inventura</h3>
		<v-row no-gutters>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-minus-circle-multiple</v-icon>
					<p>Odepsat položku</p>
				</v-card>
			</v-col>
		</v-row>

		<h3>Nastavení</h3>
		<v-row no-gutters>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-toothbrush</v-icon>
					<p>Produkty</p>
				</v-card>
			</v-col>
			<v-col
				cols="6"
				sm="1"
				md="3"
			>
				<v-card
					class="pa-2 navigation-card"
					outlined
					tile
				>
					<v-icon>mdi-garage</v-icon>
					<p>Sklady</p>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	export default {
		name: 'Home'
	}
</script>

<style>
.navigation-card {
	cursor: pointer;
	text-align: center;
}
</style>
