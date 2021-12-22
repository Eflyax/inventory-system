<template>
	<v-container>
		<template
			v-for="(menuSection, index) in items"
		>
			<h3 :key="'h' + index">{{ menuSection.header }}</h3>

			<v-row no-gutters :key="'row' + index">
				<v-col
					v-for="(menuItem, indexChild) in menuSection.children"
					cols="6"
					sm="1"
					md="3"
					:key="'c' + indexChild"
					@click="goToLink(menuItem.link)"
				>
					<v-card
						class="pa-2 navigation-card"
						outlined
						tile
					>
						<v-icon>{{ menuItem.icon }}</v-icon>
						<p>{{ menuItem.text }}</p>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</v-container>
</template>

<script lang="ts">
	export default {
		name: 'Home',
		methods: {
			goToLink(link: string): void {
				if (link) {
					this.$router.push({name: link});
				}
			}
		},
		data() {
			return {
				items: [{
					header: 'Produkt',
					children: [{
						text: 'Odepsat položku',
						link: '',
						icon: 'mdi-minus-circle-multiple',
					}, {
						text: 'Naskladnit položku',
						link: '',
						icon: 'mdi-plus-circle-multiple',
					}, {
						text: 'Přesunout položku',
						link: '',
						icon: 'mdi-arrow-right-top',
					}, {
						text: 'Odstranit položku',
						link: '',
						icon: 'mdi-delete-empty',
					}]
				}, {
					header: 'Sklad',
					children: [{
						text: '',
						link: '',
						icon: '',
					}]
				}, {
					header: 'Inventura',
					children: [{
						text: 'Začít inventuru',
						link: '',
						icon: 'mdi-clipboard-edit-outline',
					}, {
						text: 'Historie inventur',
						link: '',
						icon: 'mdi-clipboard-clock-outline',
					}]
				}, {
					header: 'Nastavení',
					children: [{
						text: 'Produkt',
						link: 'SettingsProduct',
						icon: 'mdi-toothbrush',
					}, {
						text: 'Sklad',
						link: 'SettingsStock',
						icon: 'mdi-garage',
					}]
				}]
			};
		}
	}
</script>

<style>
.navigation-card {
	cursor: pointer;
	text-align: center;
}
</style>
