<template>
  <v-app>
		<v-app-bar density="compact">
			<router-link to="/">
				<v-app-bar-title>
					Usmívejte se
				</v-app-bar-title>
			</router-link>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
  </v-app>
</template>

<script lang="ts">

export default {
	name: 'App',
	data: () => ({
		//
	}),
};
</script>
