<template>
	<div class="body">
		<div class="left-panel"></div>
		<div class="graph">
			<!-- <v-btn @click="load">Test</v-btn> -->

		</div>
		<div class="sidebar"></div>
	</div>
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
