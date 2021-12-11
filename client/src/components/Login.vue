<template>
	<div class="login">
		<div
			class="loader"
			v-if="loading"
		></div>
		<div v-else>
			list...
			<!-- <v-sheet
				v-for=""
				color="success"
				elevation="14"
				height="92"
				rounded
				shaped
				width="100"
			></v-sheet> -->
		</div>
	</div>
</template>

<script lang="ts">
import {useUser} from '@composables';

export const Home = {
	name: "Home",
	setup() {
		const {loadUser, loadUserList, user, loading} = useUser();

		loadUserList();

		return {
			loadUser,
			loadUserList,
			user,
			loading
		}
	}
};

export default Home;
</script>
