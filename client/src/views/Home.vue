<template>
	<v-container>
		<v-btn>
			Odepsat položku
		</v-btn>

		<hr>

		<h2>Nastavení</h2>

		<v-btn to="/settings/product/">
			Správa produktů
		</v-btn>

		<v-btn>
			Správa skladů
		</v-btn>
	</v-container>
</template>

<script lang="ts">
import {useUser} from '@composables';

export const Home = {
	name: "Home",
	setup() {
		const {user} = useUser();

		return {
			user
		}
	},
	mounted() {
		if (!this.user) {
			this.$router.push('/login');
		}
	}
};

export default Home;
</script>
