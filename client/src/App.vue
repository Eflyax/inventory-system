<template>
	<v-app>
		<v-app-bar density="compact">
			<v-app-bar-title>Usmívejte se</v-app-bar-title>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>

export default {
	name: 'App',
	setup() {
		// const {load, gitLog} = useGitLog();

		// return {
		// 	load,
		// 	gitLog
		// };
	},
	data: () => ({
		//
	}),

}
</script>
